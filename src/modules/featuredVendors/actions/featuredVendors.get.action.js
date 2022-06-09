exports.get = {
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
