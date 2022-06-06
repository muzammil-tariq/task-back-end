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
      const data = await models.Quotes.find({
        $or: [
          {
            vendorId: userId,
          },
          {
            customerId: userId,
          },
        ],
      })
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
            : {
                customerId: 0,
              }
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
        user: { _id: userId },
      } = req;
      const data = await models.Quotes.findOne({
        _id: id,
        $or: [
          {
            vendorId: userId,
          },
          {
            customerId: userId,
          },
        ],
      })
        .populate("eventId")
        .populate("vendorId");
      return res.json({
        status: 200,
        message: messages.success,
        data,
      });
    } catch (err) {
      next(err);
    }
  },
  getEventQuotes: async (req, res, next) => {
    try {
      const {
        params: { eventId },
        user: { _id: userId },
        query: {
          limit = dataConstraint.PAGINATION_LIMIT,
          currentPage = dataConstraint.CURRENT_PAGE,
          sortBy = "createdAt",
          sortDirection = -1,
        },
      } = req;
      const data = await models.Quotes.find({
        eventId,
        $or: [
          {
            vendorId: userId,
          },
          {
            customerId: userId,
          },
        ],
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
