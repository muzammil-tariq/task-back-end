const authService = new services.AuthService(models.Vendors);
const crudService = new services.CrudService(models.Vendors);
const { FRONTEND_URL } = process.env;

exports.auth = {
  signUp: async (req, res, next) => {
    const { body: payload } = req;
    try {
      payload["informationSteps"] = "business";
      const vendor = await authService.signUp(payload);
      libs.emailService.vendorSignup({
        user: vendor,
        verificationCode: vendor.verificationCode,
      });
      return res.json({
        status: 200,
        message: messages.created("Vendor"),
        data: vendor,
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
      const {
        body: { email },
      } = req;
      await authService.forgotPassword({ email });
      return res.json({
        status: 200,
        message: messages.success,
      });
    } catch (err) {
      next(err);
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const {
        body: { code, password, email },
      } = req;
      const verificationCode = parseInt(code);
      const vendor = await authService.verifyEmail({ email });
      await authService.resetPassword({
        email,
        password,
        verificationCode,
      });
      return res.json({
        status: 200,
        message: messages.updateAttr("Password"),
      });
    } catch (err) {
      next(err);
    }
  },
};
