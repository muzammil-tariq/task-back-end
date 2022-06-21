exports.get = {
  listServices: async (req, res, next) => {
    try {
      const {
        query: {
          text = "",
          limit = dataConstraint.PAGINATION_LIMIT,
          currentPage = dataConstraint.CURRENT_PAGE,
        },
      } = req;
      const where = { isDeleted: false };
      if (text) where["name"] = { $regex: text, $options: "i" };
      const data = await models.Services.find(where)
        .skip(limit * currentPage - limit)
        .limit(limit);
      return res.json({
        status: 200,
        message: messages.success,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
  serviceById: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const data = await models.Services.findOne({
        _id: id,
        isDeleted: false,
      });
      if (!data) throw createError(404, messages.notFound("Service"));
      return res.json({
        status: 200,
        message: messages.success,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
  vendorsByServices: async (req, res, next) => {
    try {
      const {
        params: { id },
        query: {
          text = "",
          limit = dataConstraint.PAGINATION_LIMIT,
          currentPage = dataConstraint.CURRENT_PAGE,
          sortBy = "rating",
          sortDirection = -1,
        },
      } = req;
      const serviceWhere = { _id: id };
      if (text) serviceWhere["name"] = { $regex: text, $options: "i" };
      const services = await models.Services.find(serviceWhere).select("_id");
      const servicesId = services.map((subService) => subService._id);
      const where = { skills: { $in: servicesId } };
      const data = await models.Vendors.find(where)
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
    } catch (error) {
      next(error);
    }
  },
};
