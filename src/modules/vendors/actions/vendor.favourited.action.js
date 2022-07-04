module.exports.favourited = {
  getList: async (req, res, next) => {
    try {
      const {
        user: { _id: userId },
        query: {
          limit = dataConstraint.PAGINATION_LIMIT,
          currentPage = dataConstraint.CURRENT_PAGE,
          sortBy = "createdAt",
          sortDirection = -1,
        },
      } = req;
      const data = await models.FavouritedVendors.findOne({
        customerId: userId,
      }).populate({
        path: "vendorIds",
        options: {
          sort: { [sortBy]: sortDirection },
          skip: limit * currentPage - limit,
          limit,
        },
      });
      return res.json({
        status: 200,
        message: messages.success,
        data: data?.vendorIds,
      });
    } catch (err) {
      next(err);
    }
  },
  add: async (req, res, next) => {
    try {
      const {
        user: { _id: userId },
        body: { vendorId },
      } = req;
      const vendor = await models.Vendors.findById(vendorId).select("id");
      if (!vendor) {
        throw createError(404, messages.notFound("Vendor"));
      }
      const data = await models.FavouritedVendors.findOneAndUpdate(
        { customerId: userId },
        { $addToSet: { vendorIds: vendorId } },
        {
          upsert: true,
          new: true,
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
  remove: async (req, res, next) => {
    try {
      const {
        user: { _id: userId },
        body: { vendorId },
      } = req;
      const vendor = await models.Vendors.findById(vendorId).select("id");
      if (!vendor) {
        throw createError(404, messages.notFound("Vendor"));
      }
      const data = await models.FavouritedVendors.findOneAndUpdate(
        { customerId: userId },
        { $pull: { vendorIds: vendorId } },
        {
          new: true,
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
};
