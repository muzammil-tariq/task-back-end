exports.check = {
  user: async (req, res, next) => {
    try {
      const { user } = req;
      const model = user.getModelType();
      let data;
      if (model == "Customers") {
        data = await models.Customers.findOne({ _id: user.id });
      } else if (model == "Vendors") {
        data = await models.Vendors.findOne({ _id: user.id });
      } else {
        throw createError(400, "Invalid model type");
      }
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
