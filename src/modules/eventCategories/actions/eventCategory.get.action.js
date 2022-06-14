exports.get = {
  listCategories: async (req, res, next) => {
    try {
      const data = await models.EventCategories.find({ isDeleted: false });
      return res.json({
        status: 200,
        message: messages.success,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
  listSubCategories: async (req, res, next) => {
    try {
      const {
        query: {
          zipCode,
          text = "",
          categoryId = "",
          limit = dataConstraint.PAGINATION_LIMIT,
          currentPage = dataConstraint.CURRENT_PAGE,
          sortBy = "createdAt",
          sortDirection = -1,
        },
      } = req;
      const where = { isDeleted: false };
      if (zipCode) where["zipCode"] = zipCode;
      if (text) where["name"] = { $regex: text, $options: "i" };
      if (categoryId) where["category"] = categoryId;
      const data = await models.EventSubCategories.find(where)
        .skip(limit * currentPage - limit)
        .limit(limit)
        .sort({ [sortBy]: sortDirection })
        .populate("category");

      return res.json({ status: 200, message: messages.success, data });
    } catch (err) {
      next(err);
    }
  },
  subCategoryById: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const data = await models.EventSubCategories.findOne({
        _id: id,
        isDeleted: false,
      }).populate("category");
      if (!data) throw createError(404, messages.notFound("SubCategory"));
      return res.json({
        status: 200,
        message: messages.success,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
  categoryById: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const data = await models.EventCategories.findOne({
        _id: id,
        isDeleted: false,
      });
      if (!data) throw createError(404, messages.notFound("Category"));
      return res.json({
        status: 200,
        message: messages.success,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
  vendorsBySubCategories: async (req, res, next) => {
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
      const where = { isDeleted: false, skills: id };
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
