const { USER_ROLE } = constants;
module.exports = {
  getList: async (req, res, next) => {
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
      const data = await models.Bookings.find(!isAdmin ? where : {})
        .skip(limit * currentPage - limit)
        .limit(limit)
        .sort({
          [sortBy]: sortDirection,
        })
        .populate("eventId", {
          vendorIds: 0,
        })
        .populate("customerId", ["firstName", "lastName", "profilePhoto"])
        .populate("vendorId", ["fullName", "profilePhoto", "skills", "rating"])
        .select(
          isVendor
            ? { vendorId: 0 }
            : !isAdmin
            ? {
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
  getById: async (req, res, next) => {
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
        .populate("eventId", {
          vendorIds: 0,
        })
        .populate("customerId", ["firstName", "lastName", "profilePhoto"])
        .populate("vendorId", ["fullName", "profilePhoto", "skills", "rating"])
        .select(
          isVendor
            ? { vendorId: 0 }
            : !isAdmin
            ? {
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
  getEventBookings: async (req, res, next) => {
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
};
