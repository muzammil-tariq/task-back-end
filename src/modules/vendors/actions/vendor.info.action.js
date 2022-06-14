const VendorCrudService = new services.CrudService(models.Vendors);

const strongParams = [
  "createdAt",
  "updatedAt",
  "password",
  "email",
  "isVerified",
  "codeExpiryTime",
  "verificationCode",
];

exports.info = {
  businessInfo: async (req, res, next) => {
    try {
      const {
        user: { _id: vendorId },
        body: payload,
      } = req;
      payload["informationSteps"] = "address";
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
  addressInfo: async (req, res, next) => {
    try {
      const {
        user: { _id: vendorId, informationSteps = null },
        body: payload,
      } = req;

      if (!informationSteps || informationSteps !== "address")
        throw createError(
          400,
          messages.missingInfoStep("Business Information")
        );

      payload["informationSteps"] = "completed";
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
