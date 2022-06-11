module.exports.get = {
  list: async (req, res, next) => {
    try {
      const {
        query: {
          limit = dataConstraint.PAGINATION_LIMIT,
          currentPage = dataConstraint.CURRENT_PAGE,
          sortBy = "createdAt",
          sortDirection = -1,
        },
      } = req;
      const vendors = await models.Vendors.find({})
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
        populate: { path: "category", select: "category" },
      });
      return res.json({
        status: 200,
        message: messages.success,
        data: vendor,
      });
    } catch (err) {
      next(err);
    }
  },
};
