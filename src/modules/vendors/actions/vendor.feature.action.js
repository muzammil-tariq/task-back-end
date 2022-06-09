exports.feature = {
  updateFeature: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const featuredVendor = await models.Vendors.findOneAndUpdate(
        { _id: id },
        { featured: true },
        { new: true }
      );
      res.status(200).json({
        status: 200,
        message: messages.success,
        data: featuredVendor,
      });
    } catch (error) {
      next(error);
    }
  },
  getList: async (req, res, next) => {
    try {
      const featuredVendors = await models.Vendors.find({
        featured: true,
      }).populate({
        path: "skills",
        populate: { path: "category", select: "category" },
      });
      return res.status(200).json({
        status: 200,
        message: messages.success,
        data: featuredVendors,
      });
    } catch (error) {
      next(error);
    }
  },
};
