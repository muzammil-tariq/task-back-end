const VendorCrudService = new services.CrudService(models.Vendors);

const strongParams = [
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
        user: { _id: vendorId },
        body: payload,
      } = req;
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
