const categoryCrudService = new services.CrudService(models.EventCategories);
const subCategoryCrudService = new services.CrudService(
  models.EventSubCategories
);
exports.add = {
  category: async (req, res, next) => {
    try {
      const {
        body,
        file,
        user: { _id: adminId },
      } = req;

      const admin = await models.Admin.findById({ _id: adminId });
      if (!admin) throw createError(404, messages.notFound("Admin"));

      if (!file) throw createError(404, messages.notFound("Image"));

      const categoryPayload = {
        category: body.category,
        description: body.description,
        img: `images/${file.filename}`,
      };
      const category = await categoryCrudService.add(categoryPayload);

      const { subCategories } = body;

      if (subCategories.length) {
        const subCategoriesPayload = subCategories.map((item) => {
          return { subCategory: item, category: category._id };
        });
        await models.EventSubCategories.insertMany(subCategoriesPayload);
      }

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
        user: { _id: adminId },
        params: { id },
        file,
      } = req;

      const admin = await models.Admin.findById({ _id: adminId });
      if (!admin) throw createError(404, messages.notFound("Admin"));
      if (!file) throw createError(404, messages.notFound("Image"));
      const category = await models.EventCategories.findById({ _id: id });

      payload["image"] = `images/${file.filename}`;
      payload["category"] = id;
      const records = await subCategoryCrudService.add(payload);

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
