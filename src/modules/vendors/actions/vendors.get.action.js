const { USER_ROLE, EVENT_REQUEST_DISTANCE } = constants;

module.exports.get = {
  list: async (req, res, next) => {
    try {
      const {
        query: {
          limit = dataConstraint.PAGINATION_LIMIT,
          currentPage = dataConstraint.CURRENT_PAGE,
          sortBy = "createdAt",
          sortDirection = -1,
          text = "",
          status = "",
        },
        user,
      } = req;
      const isAdmin = user?.collection?.modelName === USER_ROLE.ADMIN;
      const where = {};
      if (isAdmin && status) where["status"] = status;
      if (text) where["$or"] = search(text);
      const vendors = await models.Vendors.find(where)
        .skip(limit * currentPage - limit)
        .limit(limit)
        .sort({
          [sortBy]: sortDirection,
        })
        .populate("skills");
      return res.json({
        status: 200,
        message: messages.success,
        data: vendors,
      });
    } catch (err) {
      next(err);
    }
  },
  byId: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const vendor = await models.Vendors.findById(id).populate({
        path: "skills",
        populate: { path: "serviceId", select: "name" },
      });
      const reviewsCount = await models.Reviews.countDocuments({
        vendorId: vendor._id,
      });
      vendor._doc["reviewsCount"] = reviewsCount;
      return res.json({
        status: 200,
        message: messages.success,
        data: vendor,
      });
    } catch (err) {
      next(err);
    }
  },
  reviews: async (req, res, next) => {
    try {
      const {
        query: {
          limit = dataConstraint.PAGINATION_LIMIT,
          currentPage = dataConstraint.CURRENT_PAGE,
          sortBy = "createdAt",
          sortDirection = -1,
        },
        params: { id },
        user,
      } = req;
      const isAdmin = user?.collection?.modelName === USER_ROLE.ADMIN;
      const data = await models.Reviews.find({
        vendorId: id,
        ...(isAdmin ? {} : { isDeleted: false }),
      })
        .skip(limit * currentPage - limit)
        .limit(limit)
        .sort({
          [sortBy]: sortDirection,
        });
      return res.json({
        status: 200,
        message: messages.success,
        data,
      });
    } catch (err) {
      next(err);
    }
  },
  stats: async (req, res, next) => {
    try {
      const {
        params: { id },
        user: {
          _id: userId,
          collection: { modelName },
          location: { coordinates } = {
            coordinates: [],
          },
          skills,
        },
        query: {
          timestamp = Math.floor(Date.now() / 1000),
          timePeriod = Math.floor(Date.now() / 1000),
        },
      } = req;
      const isAdmin = modelName === USER_ROLE.ADMIN;
      const vendorId = mongoose.Types.ObjectId(id) ?? userId;

      let userCoordinates = coordinates;
      let userSkills = skills;
      if (isAdmin) {
        const vendor = await models.Vendors.findById(vendorId);
        userCoordinates = vendor?.location?.coordinates;
        userSkills = vendor?.skills;
      }

      const startDate = new Date((timestamp - timePeriod) * 1000);
      const endDate = new Date(timestamp * 1000);
      const dateRange = {
        $gte: startDate,
        $lte: endDate,
      };
      const where = {
        createdAt: dateRange,
        vendorId,
      };
      const eventWhere = {
        createdAt: where.createdAt,
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: userCoordinates,
            },
            $maxDistance: EVENT_REQUEST_DISTANCE,
          },
        },
        "services.serviceId": {
          $in: userSkills,
        },
      };
      const [
        quotes,
        bookings,
        upcomingBookings,
        events,
        upcomingEvents,
        revenue,
      ] = await Promise.all([
        models.Quotes.find(where).count(),
        models.Bookings.find({
          ...where,
          startTime: dateRange,
        }).count(),
        models.Bookings.find({
          ...where,
          startTime: { $gt: endDate },
        }).count(),
        models.Events.find({
          ...eventWhere,
          startTime: dateRange,
        }).count(),
        models.Events.find({
          ...eventWhere,
          startTime: { $gt: endDate },
        }).count(),
        models.Bookings.aggregate([
          {
            $match: where,
          },
          {
            $group: {
              _id: {
                vendorId: "$vendorId",
              },
              totalAmount: {
                $sum: "$amount",
              },
            },
          },
        ]),
      ]);
      return res.json({
        status: 200,
        message: messages.success,
        data: {
          quotes,
          bookings,
          upcomingBookings,
          events,
          upcomingEvents,
          revenue: revenue[0]?.totalAmount,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};

function search(text) {
  return [
    {
      fullName: {
        $regex: text,
        $options: "i",
      },
    },
    {
      email: {
        $regex: text,
        $options: "i",
      },
    },
    {
      phone: {
        $regex: text,
        $options: "i",
      },
    },
  ];
}
