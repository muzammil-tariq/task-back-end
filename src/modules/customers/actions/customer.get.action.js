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
        },
      } = req;
      const where = {};
      if (text) where["$or"] = search(text);
      const customers = await models.Customers.find(where)
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

function search(text) {
  return [
    {
      firstName: {
        $regex: text,
        $options: "i",
      },
    },
    {
      lastName: {
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
