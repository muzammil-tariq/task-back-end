const categoryCrudService = new services.CrudService(models.EventCategories);
const subCategoryCrudService = new services.CrudService(
  models.EventSubCategories
);

exports.update = {
  category: async (req, res, next) => {
    try {
      const {
        body: payload,
        params: { id },
      } = req;

      const category = await categoryCrudService.update(
        payload,
        id,
        messages.notFound("Category")
      );

      return res.json({
        status: 200,
        message: messages.updatedModel("Category"),
        data: category,
      });
    } catch (error) {
      next(error);
    }
  },
  subCategory: async (req, res, next) => {
    try {
      const {
        body: payload,
        params: { id },
      } = req;

      const records = await subCategoryCrudService.update(
        _.omit(payload, "isDeleted"),
        id,
        messages.notFound("SubCategory")
      );

      return res.json({
        status: 200,
        message: messages.updatedModel("SubCategory"),
        data: records,
      });
    } catch (error) {
      next(error);
    }
  },
};
