const { USER_ROLE } = constants;
exports.get = {
  getList: async (req, res, next) => {
    try {
      const { user } = req;
      const modelName = user.collection.modelName;
      if (modelName == USER_ROLE.CUSTOMER) {
        const data = await models.Quotes.find({});
        res.status(200).json({ msg: "Service List", data });
      } else {
        throw createError(400, messages.invalidModel);
      }
    } catch (err) {
      next(err);
    }
  },
};
