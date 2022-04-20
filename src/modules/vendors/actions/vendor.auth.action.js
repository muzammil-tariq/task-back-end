const authService = new services.AuthService(models.Vendors);
const crudService = new services.CrudService(models.Vendors);
const { FRONTEND_URL } = process.env;

exports.auth = {
  signUp: async (req, res, next) => {
    const { body: payload } = req;
    try {
      payload["informationSteps"] = "business";
      const data = await authService.signUp(payload);
      return res.json({
        status: 200,
        message: messages.created("Vendors"),
        data: data,
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
      let vendor = await authService.verifyEmail(payload);

      res.json({
        status: 200,
        message: messages.success,
        data: vendor,
      });
    } catch (error) {
      next(error);
    }
  },

  verifyCode: async (req, res, next) => {
    try {
      const id = req.params.id;
      const code = parseInt(req.body.code);

      let vendor = await authService.verifyCode(id, code);
      if (!vendor.isVerified) {
        throw createError(400, messages.notVerified);
      }
      return res.json({
        status: 200,
        message: messages.verified,
        data: vendor,
      });
    } catch (error) {
      next(error);
    }
  },

  resendCode: async (req, res, next) => {
    try {
      const id = req.params.id;
      let vendor = await authService.resendCode(id);

      return res.json({
        status: 200,
        message: messages.resendCode,
        data: vendor,
      });
    } catch (error) {
      next(error);
    }
  },
  forgotPassword: async (req, res, next) => {
    try {
      let { body: payload } = req;
      let vendor = await authService.verifyEmail(payload);
      const verificationCode = utils.random.generateRandomNumber();
      const codeExpiryTime = Date.now();
      vendor = await crudService.update(
        { verificationCode, codeExpiryTime },
        vendor._id,
        messages.userNotFound
      );
      await libs.email_service.sendEmail(vendor);
      // await AuthNotificationService.forgotPassword(vendor, "Client", "email");
      vendor._doc["token"] = vendor.getJWTToken();
      return res.json({
        status: 200,
        message: messages.success,
        data: vendor,
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
      let vendor = await models.Vendors.findById(id);
      if (!vendor) {
        throw createError(400, messages.userNotFound);
      }
      const currentTime = Date.now();
      // It will be empty when no request had been made for resetPassword
      if (!vendor.codeExpiryTime) {
        throw createError(400, messages.invalidCode);
      }
      if (
        currentTime - vendor.codeExpiryTime >
        dataConstraint.CODE_EXPIRY_TIME
      ) {
        throw createError(400, messages.codeExpried);
      }
      if (vendor.verificationCode !== verificationCode) {
        throw createError(400, messages.invalidCode);
      }
      vendor = await crudService.update(
        { password },
        vendor._id,
        messages.userNotFound
      );
      return res.json({
        status: 200,
        message: messages.updateAttr("Password"),
        data: vendor,
      });
    } catch (err) {
      next(err);
    }
  },
  // continue with facebook callback url
  facebookCb: async (req, res, next) => {
    const token = req.user.getJWTToken();

    if (token) {
      return res.redirect(FRONTEND_URL + "/auth/callback?token=" + token);
    } else {
      throw createError(400, messages.badRequest);
    }
  },
  // continue with google callback url
  googleCb: async (req, res, next) => {
    const token = req.user.getJWTToken();

    if (token) {
      res.redirect(FRONTEND_URL + "/auth/callback?token=" + token);
    } else {
      throw createError(400, messages.badRequest);
    }
  },
};
