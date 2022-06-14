exports.get = {
  getList: async (req, res, next) => {
    try {
      const {
        query: {
          zipCode,
          text = "",
          limit = dataConstraint.PAGINATION_LIMIT,
          currentPage = dataConstraint.CURRENT_PAGE,
          sortBy = "createdAt",
          sortDirection = -1,
        },
      } = req;
      const where = {};
      if (zipCode) where["zipCode"] = zipCode;
      if (text) where["name"] = { $regex: text, $options: "i" };
      const data = await models.EventSubCategories.find(where)
        .skip(limit * currentPage - limit)
        .limit(limit)
        .sort({ [sortBy]: sortDirection });
      res.status(200).json({ msg: "Service List", data });
    } catch (err) {
      next(err);
    }
  },
  getById: async (req, res, next) => {
    try {
      const data = await models.Vendors.find({
        skills: { $in: [req.params.id] },
      });
      if (data.length === 0) {
        {
          throw createError(404, messages.notFound("Vendor"));
        }
      }
      res.status(200).json({ msg: "Service List", data });
    } catch (err) {
      next(err);
    }
  },
};
