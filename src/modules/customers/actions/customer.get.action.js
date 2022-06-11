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
      const customers = await models.Customers.find({})
        .skip(limit * currentPage - limit)
        .limit(limit)
        .sort({
          [sortBy]: sortDirection,
        });
      return res.json({
        status: 200,
        message: messages.success,
        data: customers,
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
      const customer = await models.Customers.findById(id);
      return res.json({
        status: 200,
        message: messages.success,
        data: customer,
      });
    } catch (err) {
      next(err);
    }
  },
};
