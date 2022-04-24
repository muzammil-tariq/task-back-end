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
      const data = await models.EventSubCategories.find({
        isDeleted: false,
      }).populate("category");
      return res.json({
        status: 200,
        message: messages.success,
        data: data,
      });
    } catch (error) {
      next(error);
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
};
