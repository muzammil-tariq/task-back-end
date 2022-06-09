exports.featured = {
  update: async (req, res, next) => {
    try {
      const {
        params: { id },
        body: { isFeatured },
      } = req;
      const featuredVendor = await models.Vendors.findOneAndUpdate(
        { _id: id },
        { isFeatured: isFeatured },
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
        isFeatured: true,
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
