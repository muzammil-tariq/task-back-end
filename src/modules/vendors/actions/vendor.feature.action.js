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
};
