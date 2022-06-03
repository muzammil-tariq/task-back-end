const updateCustomerStrongParams = [
  ...models.Customers.excludedAttributes,
  "username",
  "email",
];

const settingsService = new services.SettingsService(models.Customers);

module.exports.update = {
  profile: async (req, res, next) => {
    try {
      const { body: payload, user } = req;

      const data = await models.Customers.findOneAndUpdate(
        { _id: user._id },
        _.omit(payload, updateCustomerStrongParams),
        { new: true }
      );
      if (payload.password && payload.existingPassword) {
        await settingsService.changePassword({
          existingPassword: payload.password,
          password: payload.existingPassword,
          user,
        });
      }
      if (payload.email) {
        await settingsService.changeEmail({ email: payload.email, user });
      }
      return res.json({
        status: 200,
        message: messages.updatedModel("Customer"),
        data,
      });
    } catch (err) {
      next(err);
    }
  },
};
