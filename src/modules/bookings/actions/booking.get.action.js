const { USER_ROLE } = constants;
module.exports.get = {
  list: async (req, res, next) => {
    try {
      const {
        query: {
          limit = dataConstraint.PAGINATION_LIMIT,
          currentPage = dataConstraint.CURRENT_PAGE,
          sortBy = "createdAt",
          sortDirection = -1,
          status = "",
        },
        user: {
          _id: userId,
          collection: { modelName },
        },
      } = req;
      const isVendor = modelName === USER_ROLE.VENDOR;
      const isAdmin = modelName === USER_ROLE.ADMIN;
      const where = {
        $or: [
          {
            vendorId: userId,
          },
          {
            customerId: userId,
          },
        ],
      };
      if (status) where["status"] = status;

      const data = await models.Bookings.find(!isAdmin ? where : {})
        .skip(limit * currentPage - limit)
        .limit(limit)
        .sort({
          [sortBy]: sortDirection,
        })
        .populate("eventId")
        .populate("meetingId")
        .populate("customerId", ["firstName", "lastName", "profilePhoto"])
        .populate("vendorId", ["fullName", "profilePhoto", "skills", "rating"])
        .select(
          !isAdmin
            ? isVendor
              ? { vendorId: 0 }
              : {
                  customerId: 0,
                }
            : {}
        );
      return res.json({
        status: 200,
        message: messages.success,
        data,
      });
    } catch (err) {
      next(err);
    }
  },
  byId: async (req, res, next) => {
    try {
      const {
        params: { id },
        user: {
          _id: userId,
          collection: { modelName },
        },
      } = req;
      const isVendor = modelName === USER_ROLE.VENDOR;
      const isAdmin = modelName === USER_ROLE.ADMIN;
      const where = {
        $or: [
          {
            vendorId: userId,
          },
          {
            customerId: userId,
          },
        ],
      };
      const data = await models.Bookings.findOne({
        _id: id,
        ...(!isAdmin ? where : {}),
      })
        .populate("eventId")
        .populate("meetingId")
        .populate("customerId", ["firstName", "lastName", "profilePhoto"])
        .populate("vendorId", ["fullName", "profilePhoto", "skills", "rating"])
        .select(
          !isAdmin
            ? isVendor
              ? { vendorId: 0 }
              : {
                  customerId: 0,
                }
            : {}
        );
      return res.json({
        status: 200,
        message: messages.success,
        data,
      });
    } catch (err) {
      next(err);
    }
  },
  eventBookings: async (req, res, next) => {
    try {
      const {
        params: { eventId },
        user: {
          _id: userId,
          collection: { modelName },
        },
        query: {
          limit = dataConstraint.PAGINATION_LIMIT,
          currentPage = dataConstraint.CURRENT_PAGE,
          sortBy = "createdAt",
          sortDirection = -1,
        },
      } = req;
      const isAdmin = modelName === USER_ROLE.ADMIN;
      const where = {
        $or: [
          {
            vendorId: userId,
          },
          {
            customerId: userId,
          },
        ],
      };
      const data = await models.Bookings.find({
        eventId,
        ...(!isAdmin ? where : {}),
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
  listByVendorId: async (req, res, next) => {
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
      const where = {
        vendorId,
      };
      const data = await models.Bookings.find(where)
        .skip(limit * currentPage - limit)
        .limit(limit)
        .sort({
          [sortBy]: sortDirection,
        })
        .populate("eventId")
        .populate("meetingId")
        .populate("customerId", ["firstName", "lastName", "profilePhoto"])
        .populate("vendorId", ["fullName", "profilePhoto", "skills", "rating"]);
      return res.json({
        status: 200,
        message: messages.success,
        data,
      });
    } catch (err) {
      next(err);
    }
  },
  listByCustomerId: async (req, res, next) => {
    try {
      const {
        query: {
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
      const data = await models.Bookings.find(where)
        .skip(limit * currentPage - limit)
        .limit(limit)
        .sort({
          [sortBy]: sortDirection,
        })
        .populate("eventId")
        .populate("meetingId")
        .populate("customerId", ["firstName", "lastName", "profilePhoto"])
        .populate("vendorId", ["fullName", "profilePhoto", "skills", "rating"]);
      return res.json({
        status: 200,
        message: messages.success,
        data,
      });
    } catch (err) {
      next(err);
    }
  },
};
