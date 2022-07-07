const settingsService = new services.SettingsService(models.Vendors);

exports.update = {
  profile: async (req, res, next) => {
    try {
      const { body: payload, user } = req;

      const data = await models.Vendors.findOneAndUpdate(
        { _id: user._id },
        _.omit(payload, models.Vendors.updateForbiddenAttributes),
        { new: true }
      );
      if (payload.password && payload.existingPassword) {
        await settingsService.changePassword({
          existingPassword: payload.existingPassword,
          password: payload.password,
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
  status: async (req, res, next) => {
    try {
      const {
        params: { id },
        body: { status },
      } = req;
      const data = await models.Vendors.findById(id);
      if (
        data?.status !== status &&
        statusStateChart[data?.status].includes(status)
      ) {
        const old = data?.status;
        data.status = status;
        await data.save();

        if (
          status === models.Vendors.status.APPROVED &&
          old !== models.Vendors.status.SUSPENDED
        ) {
          libs.emailService.vendorApproval({
            user: data,
          });
        }
      }
      return res.json({
        status: 200,
        message: messages.success,
        data,
      });
    } catch (err) {
      next(err);
    }
  },
};

// State chart for vendor status
const statusStateChart = {
  [models.Vendors.status.PENDING]: [
    models.Vendors.status.APPROVED,
    models.Vendors.status.REJECTED,
  ],
  [models.Vendors.status.APPROVED]: [models.Vendors.status.SUSPENDED],
  [models.Vendors.status.REJECTED]: [
    models.Vendors.status.PENDING,
    models.Vendors.status.APPROVED,
  ],
  [models.Vendors.status.SUSPENDED]: [models.Vendors.status.APPROVED],
};
