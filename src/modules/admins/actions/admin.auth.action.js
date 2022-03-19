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
        email: "admin@example.com",
        password: "admin123",
      };
      const isAlreadyExist = await models.Admin.findOne({ email: obj.email });
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
