exports.get = {
  getList: async (req, res, next) => {
    try {
      const data = await models.EventSubCategories.find({});
      res.status(200).json({ msg: "Service List", data });
    } catch (err) {
      next(err);
    }
  },
  getById: async (req, res, next) => {
    try {
      const data = await models.Vendors.find({
        skills: { $in: [req.params.id] },
      }).populate("category");
      if (data.length === 0) {
        {
          throw createError(404, messages.notFound("Vendor"));
        }
      }
      res.status(200).json({ msg: "Service List", data });
    } catch (err) {
      next(err);
    }
  },
};