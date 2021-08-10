const authService = new services.AuthService(models.Users);
const crudService = new services.CrudService(models.Users);

exports.auth = {
  signUp: async (req, res, next) => {
    const { body: payload } = req;
    try {
      let Users = await authService.signUp(payload);

      return res.json({
        status: 200,
        message: messages.created("Users"),
        data: Users,
      });
    } catch (err) {
      next(err);
    }
  },
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

  verifyEmail: async (req, res, next) => {
    try {
      let { body: payload } = req;
      let user = await authService.verifyEmail(payload);

      res.json({
        status: 200,
        message: messages.success,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  verifyCode: async (req, res, next) => {
    try {
      const id = req.params.id;
      const code = parseInt(req.body.code);

      let user = await authService.verifyCode(id, code);
      if (!user.isVerified) {
        throw createError(400, messages.notVerified);
      }
      return res.json({
        status: 200,
        message: messages.verified,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  resendCode: async (req, res, next) => {
    try {
      const id = req.params.id;
      let user = await authService.resendCode(id);

      return res.json({
        status: 200,
        message: messages.resendCode,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  forgotPassword: async (req, res, next) => {
    try {
      let { body: payload } = req;
      let user = await authService.verifyEmail(payload);
      const verificationCode = utils.random.generateRandomNumber();
      const codeExpiryTime = Date.now();
      user = await crudService.update(
        { verificationCode, codeExpiryTime },
        user._id,
        messages.userNotFound
      );
      await libs.email_service.sendEmail(user);
      // await AuthNotificationService.forgotPassword(user, "Client", "email");
      user._doc["token"] = user.getJWTToken();
      return res.json({
        status: 200,
        message: messages.success,
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const {
        body: { code, password },
        params: { id },
      } = req;
      const verificationCode = parseInt(code);
      let user = await models.Users.findById(id);
      if (!user) {
        throw createError(400, messages.userNotFound);
      }
      const currentTime = Date.now();
      // It will be empty when no request had been made for resetPassword
      if (!user.codeExpiryTime) {
        throw createError(400, messages.invalidCode);
      }
      if (currentTime - user.codeExpiryTime > dataConstraint.CODE_EXPIRY_TIME) {
        throw createError(400, messages.codeExpried);
      }
      if (user.verificationCode !== verificationCode) {
        throw createError(400, messages.invalidCode);
      }
      user = await crudService.update(
        { password },
        user._id,
        messages.userNotFound
      );
      return res.json({
        status: 200,
        message: messages.updateAttr("Password"),
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },
};
