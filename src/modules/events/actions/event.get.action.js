exports.get = {
  list: async (req, res, next) => {
    try {
      const {
        query: { status, type, sort = 1, text = "" },
        user: { _id: userId },
      } = req;
      const where = {
        isDeleted: false,
        $or: [
          {
            customerId: userId,
          },
          {
            vendorIds: userId,
          },
        ],
      };
      if (status) where["status"] = status;
      if (type) where["type"] = type;
      if (text) where["title"] = { $regex: text, $options: "i" };
      const data = await models.Events.find(where)
        .sort({ createdAt: sort })
        .populate({
          path: "subCategories",
          populate: {
            path: "category",
          },
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
  byId: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const data = await models.Events.findOne({
        _id: id,
        isDeleted: false,
      }).populate({
        path: "subCategories",
        populate: {
          path: "category",
        },
      });
      if (!data) throw createError(404, messages.notFound("Event"));
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
