const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
exports.auth = {
  signIn: async (req, res, next) => {
    try {
      const token = req.user.getJWTToken();
      req.user._doc["token"] = token;
      return res.json({
        status: 200,
        message: messages.signedIn,
        data: req.user,
      });
    } catch (err) {
      next(err);
    }
  },
  seeder: async (req, res, next) => {
    try {
      const obj = {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      };
      const isAlreadyExist = await models.Admin.findOne({ email: obj.email });
      addDefaultSettings();
      if (isAlreadyExist) throw createError(400, messages.userExists);
      const admin = await models.Admin.create(obj);
      return res.json({
        status: 200,
        message: messages.created("Admin"),
        data: admin,
      });
    } catch (err) {
      next(err);
    }
  },
};

async function addDefaultSettings() {
  const alreadyExists = await models.Settings.findOne();
  if (!alreadyExists) {
    const settings = await models.Settings.create({
      platformCommission: 0.15,
      eventRequestDistance: 80467,
    });
    helpers.setting.update(settings);
  }
}
