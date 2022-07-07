const authService = new services.AuthService(models.Customers);

exports.auth = {
  signUp: async (req, res, next) => {
    const { body: payload } = req;
    try {
      const userNameInUse = await models.Customers.findOne({
        username: payload.username,
      });
      if (userNameInUse) {
        throw createError(400, messages.usernameAlreadyInUse);
      }
      const customer = await authService.signUp(
        _.omit(payload, models.Customers.createForbiddenAttributes)
      );
      libs.emailService.customerSignup({
        user: customer,
        verificationCode: customer.verificationCode,
      });
      return res.json({
        status: 200,
        message: messages.created("Customer"),
        data: customer,
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
      let customer = await authService.verifyEmail(payload);

      res.json({
        status: 200,
        message: messages.success,
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  },

  verifyCode: async (req, res, next) => {
    try {
      const id = req.params.id;
      const code = parseInt(req.body.code);

      let customer = await authService.verifyCode(id, code);
      if (!customer.isVerified) {
        throw createError(400, messages.notVerified);
      }
      return res.json({
        status: 200,
        message: messages.verified,
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  },

  resendCode: async (req, res, next) => {
    try {
      const id = req.params.id;
      let customer = await authService.resendCode(id);

      return res.json({
        status: 200,
        message: messages.resendCode,
        data: customer,
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
  checkUsernameAvailability: async (req, res, next) => {
    try {
      const {
        params: { username },
      } = req;
      const data = await models.Customers.findOne({ username });
      return res.json({
        status: 200,
        message: messages.success,
        data: { isAvailable: !Boolean(data) },
      });
    } catch (err) {
      next(err);
    }
  },
};
