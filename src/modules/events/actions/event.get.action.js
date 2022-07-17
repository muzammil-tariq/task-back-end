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
          location: { coordinates: userCoordinates } = {
            coordinates: [],
          },
          skills = [],
        },
      } = req;

      const isVendor = modelName === USER_ROLE.VENDOR;
      const isAdmin = modelName === USER_ROLE.ADMIN;
      const isCustomer = modelName === USER_ROLE.CUSTOMER;
      const where = {
        isDeleted: false,
      };

      if (!isAdmin) {
        where["isDeleted"] = false;
      }
      if (isVendor) {
        const { eventRequestDistance } = await helpers.setting.get();
        where["location"] = {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: userCoordinates,
            },
            $maxDistance: eventRequestDistance,
          },
        };
        where["services.serviceId"] = {
          $in: skills,
        };
      } else if (isCustomer) {
        where["customerId"] = userId;
      }
      if (status) where["status"] = status;
      if (type) where["type.name"] = type;
      if (text) where["$or"] = search(text);

      const data = await models.Events.find(where)
        .skip(limit * currentPage - limit)
        .limit(limit)
        .sort({ [sortBy]: sortDirection })
        .populate("type.eventTypeId", ["name", "images"])
        .populate("services.serviceId")
        .populate("customerId", ["firstName", "lastName", "profilePhoto"])
        .populate({
          path: "quotes",
          match: {
            vendorId: userId, // so that we only show the quotes to vendor, and to show him only his quote
          },
        })
        .populate({ path: "quotesCount" })
        .select(isVendor ? { quotesCount: 0 } : { quotes: 0 });
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
        user: {
          _id: userId,
          collection: { modelName },
          location: { coordinates: userCoordinates } = {
            coordinates: [],
          },
          skills = [],
        },
      } = req;

      const isVendor = modelName === USER_ROLE.VENDOR;
      const isAdmin = modelName === USER_ROLE.ADMIN;
      const isCustomer = modelName === USER_ROLE.CUSTOMER;

      const where = {
        isDeleted: false,
      };

      if (isVendor) {
        const quote = await models.Quotes.findOne({
          eventId: id,
        });
        if (!quote) {
          const { eventRequestDistance } = await helpers.setting.get();
          where["location"] = {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: userCoordinates,
              },
              $maxDistance: eventRequestDistance,
            },
          };
          where["services.serviceId"] = {
            $in: skills,
          };
        }
      } else if (isCustomer) {
        where["customerId"] = userId;
      }
      const data = await models.Events.findOne({
        _id: id,
        ...(!isAdmin ? where : {}),
      })
        .populate("type.eventTypeId", ["name", "images"])
        .populate("services.serviceId");
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
        query: {
          limit = dataConstraint.PAGINATION_LIMIT,
          currentPage = dataConstraint.CURRENT_PAGE,
          sortBy = "scheduledDate",
          sortDirection = 1,
        },
        user: {
          _id: userId,
          collection: { modelName },
        },
      } = req;

      const isCustomer = modelName === USER_ROLE.CUSTOMER;

      const getUpcomingEvents = isCustomer
        ? helpers.event.customerUpcomingEvents
        : helpers.event.vendorUpcomingEvents;

      const data = await getUpcomingEvents({
        userId,
        limit,
        currentPage,
        sortBy,
        sortDirection,
      });

      return res.json({
        status: 200,
        message: messages.success,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  listByVendorId: async (req, res, next) => {
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
        params: { id: vendorId },
      } = req;

      const vendor = await models.Vendors.findById(vendorId);

      if (!vendor) {
        throw createError(404, messages.notFound("Vendor"));
      }
      const { eventRequestDistance } = await helpers.setting.get();
      const where = {
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: vendor.location.coordinates,
            },
            $maxDistance: eventRequestDistance,
          },
        },
        "services.serviceId": {
          $in: vendor.skills,
        },
      };
      if (status) where["status"] = status;
      if (type) where["type"] = type;
      if (text) where["$or"] = search(text);

      const data = await models.Events.find(where)
        .skip(limit * currentPage - limit)
        .limit(limit)
        .sort({ [sortBy]: sortDirection })
        .populate("type.eventTypeId", ["name", "images"])
        .populate("services.serviceId")
        .populate("customerId", ["firstName", "lastName", "profilePhoto"])
        .populate({
          path: "quotes",
          match: {
            vendorId,
          },
        });
      return res.json({
        status: 200,
        message: messages.success,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  listByCustomerId: async (req, res, next) => {
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
        params: { id: customerId },
      } = req;

      const where = {
        customerId,
      };

      if (status) where["status"] = status;
      if (type) where["type"] = type;
      if (text) where["$or"] = search(text);

      const data = await models.Events.find(where)
        .skip(limit * currentPage - limit)
        .limit(limit)
        .sort({ [sortBy]: sortDirection })
        .populate("type.eventTypeId", ["name", "images"])
        .populate("services.serviceId")
        .populate("customerId", ["firstName", "lastName", "profilePhoto"]);
      return res.json({
        status: 200,
        message: messages.success,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  completed: async (req, res, next) => {
    try {
      const {
        query: {
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

      const isCustomer = modelName === USER_ROLE.CUSTOMER;
      const isVendor = modelName === USER_ROLE.VENDOR;
      let status;
      if (isCustomer)
        status = {
          $in: ["completedByCustomer", "completed"],
        };
      if (isVendor)
        status = {
          $in: ["completedByVendor", "completed"],
        };
      const bookings = await models.Bookings.find({
        status,
        or: [
          {
            vendorId: userId,
          },
          {
            customerId: userId,
          },
        ],
      })
        .select("eventId")
        .skip(limit * currentPage - limit)
        .limit(limit)
        .sort({
          [sortBy]: sortDirection,
        });
      const eventIds = bookings.map((booking) => booking.eventId);
      const data = await models.Events.find({
        _id: {
          $in: eventIds,
        },
      });
      return res.json({
        status: 200,
        message: messages.success,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  completedListByVendorId: async (req, res, next) => {
    try {
      const {
        query: {
          limit = dataConstraint.PAGINATION_LIMIT,
          currentPage = dataConstraint.CURRENT_PAGE,
          sortBy = "createdAt",
          sortDirection = -1,
        },
        params: { id: vendorId },
      } = req;
      const bookings = await models.Bookings.find({
        status: ["completedByVendor", "completed"],
        vendorId,
      })
        .select("eventId")
        .skip(limit * currentPage - limit)
        .limit(limit)
        .sort({
          [sortBy]: sortDirection,
        });
      const eventIds = bookings.map((booking) => booking.eventId);
      const data = await models.Events.find({
        _id: {
          $in: eventIds,
        },
      }).populate("type.eventTypeId", ["name", "images"]);
      return res.json({
        status: 200,
        message: messages.success,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  eventTypes: async (req, res, next) => {
    try {
      const data = await models.EventTypes.find({ isDeleted: false });
      return res.json({
        status: 200,
        message: messages.success,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};

function search(text) {
  return [
    {
      title: {
        $regex: text,
        $options: "i",
      },
    },
    {
      description: {
        $regex: text,
        $options: "i",
      },
    },
  ];
}
