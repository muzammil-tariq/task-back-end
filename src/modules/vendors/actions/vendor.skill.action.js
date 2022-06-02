const VendorCrudService = new services.CrudService(models.Vendors);
exports.skill = {
  updateSkill: async (req, res, next) => {
    try {
      const {
        user: { _id: vendorId },
        body: payload,
      } = req;
      const alreadyExists = await models.Vendors.findOne({
        _id: vendorId,
        skills: payload.skills,
      });
      if (alreadyExists) {
        throw createError(400, messages.alreadyExists("skills"));
      }
      const data = await models.Vendors.findOneAndUpdate(
        { _id: vendorId },
        {
          $push: { skills: payload.skills },
        },
        { new: true }
      );
      return res.json({
        status: 200,
        message: messages.updatedModel("Vendor"),
        data,
      });
    } catch (err) {
      next(err);
    }
  },
};
