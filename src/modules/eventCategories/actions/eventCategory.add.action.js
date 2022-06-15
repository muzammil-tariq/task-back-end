const categoryCrudService = new services.CrudService(models.EventCategories);
const subCategoryCrudService = new services.CrudService(
  models.EventSubCategories
);
exports.add = {
  category: async (req, res, next) => {
    try {
      const { body } = req;
      const category = await categoryCrudService.add(body);

      return res.json({
        status: 201,
        message: messages.created("Categories"),
        data: category,
      });
    } catch (error) {
      next(error);
    }
  },
  subcategory: async (req, res, next) => {
    try {
      const {
        body: payload,
        params: { id },
      } = req;

      const category = await models.EventCategories.findById({ _id: id });
      if (!category) {
        throw createError(404, messages.notFound("Category"));
      }

      payload["category"] = id;
      const data = await subCategoryCrudService.add(payload);

      return res.json({
        status: 200,
        message: messages.updatedModel("SubCategory"),
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
