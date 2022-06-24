const settingsService = new services.SettingsService(models.Vendors);

const strongParams = [
  ...models.Vendors.excludedAttributes,
  "createdAt",
  "updatedAt",
  "username",
  "email",
  "rating",
  "paypalMerchantId",
  "isFeatured",
];

exports.update = {
  profile: async (req, res, next) => {
    try {
      const { body: payload, user } = req;

      const data = await models.Vendors.findOneAndUpdate(
        { _id: user._id },
        _.omit(payload, strongParams),
        { new: true }
      );
      if (payload.password && payload.existingPassword) {
        await settingsService.changePassword({
          existingPassword: payload.password,
          password: payload.existingPassword,
          user,
        });
      }
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
