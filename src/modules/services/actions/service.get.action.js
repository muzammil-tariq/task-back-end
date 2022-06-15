exports.get = {
  listServices: async (req, res, next) => {
    try {
      const data = await models.Services.find({ isDeleted: false });
      return res.json({
        status: 200,
        message: messages.success,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
  listSubServices: async (req, res, next) => {
    try {
      const {
        query: {
          zipCode,
          text = "",
          serviceId = "",
          limit = dataConstraint.PAGINATION_LIMIT,
          currentPage = dataConstraint.CURRENT_PAGE,
          sortBy = "createdAt",
          sortDirection = -1,
        },
      } = req;
      const where = { isDeleted: false };
      if (zipCode) where["zipCode"] = zipCode;
      if (text) where["name"] = { $regex: text, $options: "i" };
      if (serviceId) where["serviceId"] = serviceId;
      const data = await models.SubServices.find(where)
        .skip(limit * currentPage - limit)
        .limit(limit)
        .sort({ [sortBy]: sortDirection })
        .populate("serviceId");

      return res.json({ status: 200, message: messages.success, data });
    } catch (err) {
      next(err);
    }
  },
  subServiceById: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const data = await models.SubServices.findOne({
        _id: id,
        isDeleted: false,
      }).populate("serviceId");
      if (!data) throw createError(404, messages.notFound("SubService"));
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
  vendorsBySubServices: async (req, res, next) => {
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
      const where = { skills: id };
      if (text) where["fullName"] = { $regex: text, $options: "i" };
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
