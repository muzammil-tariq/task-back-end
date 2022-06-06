const categoryCrudService = new services.CrudService(models.EventCategories);

exports.update = {
  category: async (req, res, next) => {
    try {
      const {
        body: payload,
        file,
        user: { _id: adminId },
        params: { id },
      } = req;

      const admin = await models.Admin.findById({ _id: adminId });
      if (!admin) throw createError(404, messages.notFound("Admin"));

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
        user: { _id: adminId },
        params: { id },
      } = req;

      const admin = await models.Admin.findById({ _id: adminId });
      if (!admin) throw createError(404, messages.notFound("Admin"));

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
        user: { _id: adminId },
        params: { id },
        file,
      } = req;

      const admin = await models.Admin.findById({ _id: adminId });
      if (!admin) throw createError(404, messages.notFound("Admin"));

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
