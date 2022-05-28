const authService = new services.AuthService(models.Customers);
const crudService = new services.CrudService(models.Customers);
const { FRONTEND_URL } = process.env;

exports.auth = {
  signUp: async (req, res, next) => {
    const { body: payload } = req;
    try {
      let Customers = await authService.signUp(payload);

      return res.json({
        status: 200,
        message: messages.created("Customers"),
        data: Customers,
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
      let { body: payload } = req;
      let customer = await authService.verifyEmail(payload);
      const verificationCode = utils.random.generateRandomNumber();
      const codeExpiryTime = Date.now();
      customer = await crudService.update(
        { verificationCode, codeExpiryTime },
        customer._id,
        messages.userNotFound
      );
      await libs.email_service.sendEmail(customer);
      // await AuthNotificationService.forgotPassword(customer, "Client", "email");
      customer._doc["token"] = customer.getJWTToken();
      return res.json({
        status: 200,
        message: messages.success,
        data: customer,
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
      let customer = await models.Customers.findById(id);
      if (!customer) {
        throw createError(400, messages.userNotFound);
      }
      const currentTime = Date.now();
      // It will be empty when no request had been made for resetPassword
      if (!customer.codeExpiryTime) {
        throw createError(400, messages.invalidCode);
      }
      if (
        currentTime - customer.codeExpiryTime >
        dataConstraint.CODE_EXPIRY_TIME
      ) {
        throw createError(400, messages.codeExpried);
      }
      if (customer.verificationCode !== verificationCode) {
        throw createError(400, messages.invalidCode);
      }
      customer = await crudService.update(
        { password },
        customer._id,
        messages.userNotFound
      );
      return res.json({
        status: 200,
        message: messages.updateAttr("Password"),
        data: customer,
      });
    } catch (err) {
      next(err);
    }
  },
};
