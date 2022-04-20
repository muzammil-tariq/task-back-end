const VendorCrudService = new services.CrudService(models.Vendors);

const strongParams = [
  "password",
  "email",
  "isVerified",
  "codeExpiryTime",
  "verificationCode",
];

exports.update = {
  profilePhoto: async (req, res, next) => {
    try {
      const {
        user: { _id: vendorId },
        file,
      } = req;
      if (!file) throw createError(400, messages.missingAttr("Image File"));
      const payload = { profilePhoto: `images/${file.filename}` };
      const data = await VendorCrudService.update(
        _.omit(payload, strongParams),
        vendorId,
        messages.notFound("Vendor")
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
  profile: async (req, res, next) => {
    try {
      const {
        user: { _id: vendorId },
        body: payload,
      } = req;
      const data = await VendorCrudService.update(
        _.omit(payload, strongParams),
        vendorId,
        messages.notFound("Vendor")
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
