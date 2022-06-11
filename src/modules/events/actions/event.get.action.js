const { USER_ROLE } = constants;

exports.get = {
  list: async (req, res, next) => {
    try {
      const {
        query: {
          status,
          type,
          text = "",
          limit = dataConstraint.PAGINATION_LIMIT,
          currentPage = dataConstraint.CURRENT_PAGE,
          sortBy = "createdAt",
          sortDirection = -1,
        },
        user: {
          _id: userId,
          collection: { modelName },
        },
      } = req;

      const isVendor = modelName === USER_ROLE.VENDOR;
      const isAdmin = modelName === USER_ROLE.ADMIN;
      const where = {
        isDeleted: false,
        $or: [
          {
            customerId: userId,
          },
          {
            vendorIds: userId,
          },
        ],
      };
      if (status) where["status"] = status;
      if (type) where["type"] = type;
      if (text) where["title"] = { $regex: text, $options: "i" };
      const data = await models.Events.find(!isAdmin ? where : {})
        .skip(limit * currentPage - limit)
        .limit(limit)
        .sort({ [sortBy]: sortDirection })
        .populate({
          path: "subCategories",
          populate: {
            path: "category",
          },
        })
        .populate("customerId", ["firstName", "lastName", "profilePhoto"])
        .populate("vendorIds", ["fullName", "profilePhoto", "skills"])
        .populate({
          path: "quotes",
          match: {
            vendorId: userId, // so that we only show the quotes to vendor, and to show him only his quote
          },
        })
        .select(isVendor ? { vendorIds: 0 } : {});
      return res.json({
        status: 200,
        message: messages.success,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  byId: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const data = await models.Events.findOne({
        _id: id,
        isDeleted: false,
      }).populate({
        path: "subCategories",
        populate: {
          path: "category",
        },
      });
      if (!data) throw createError(404, messages.notFound("Event"));
      return res.json({
        status: 200,
        message: messages.success,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
  upcomingEvent: async (req, res, next) => {
    try {
      const {
        user: { _id: customerId },
      } = req;

      const data = await models.Events.findOne({
        customerId,
        isDeleted: false,
        startTime: {
          $gte: moment().toISOString(),
        },
      })
        .sort({ scheduledDate: 1 })
        .populate({
          path: "subCategories",
          populate: {
            path: "category",
          },
        });
      return res.json({
        status: 200,
        message: messages.success,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
};
