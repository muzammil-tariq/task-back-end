const categoryCrudService = new services.CrudService(models.EventCategories);

exports.update = {
  category: async (req, res, next) => {
    try {
      const {
        body: payload,
        file,
        params: { id },
      } = req;

      if (file) payload["img"] = `images/${file.filename}`;

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
  subCategoy: async (req, res, next) => {
    try {
      const {
        body,
        params: { id },
      } = req;

      const category = await categoryCrudService.getModelById(
        id,
        messages.notFound("Category")
      );

      await models.EventSubCategories.deleteMany({ category: category._id });

      const { subCategories = [] } = body;
      const payload = subCategories.map((item) => {
        return { subCategory: item, category: category._id };
      });

      const records = await models.EventSubCategories.insertMany(payload);

      return res.json({
        status: 200,
        message: messages.updatedModel("SubCategory"),
        data: records,
      });
    } catch (error) {
      next(error);
    }
  },
  subCategoryImage: async (req, res, next) => {
    try {
      const {
        body: payload,
        params: { id },
        file,
      } = req;

      if (!file) throw createError(404, messages.notFound("Image"));
      payload["image"] = `images/${file.filename}`;

      const records = await models.EventSubCategories.findOneAndUpdate(
        { _id: id },
        { image: payload.image },
        { new: true }
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
