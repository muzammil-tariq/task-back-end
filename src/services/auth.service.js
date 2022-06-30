class AuthService {
  constructor(model) {
    this.model = model;
    this.crudService = new services.CrudService(model);
  }

  async signUp(payload) {
    let user = await this.model.findOne({
      email: payload.email,
    });

    if (user) {
      throw createError(400, messages.emailExists);
    }
    payload["verificationCode"] = utils.random.generateRandomNumber();
    user = await this.model.create(payload);
    var token = user.getJWTToken();
    user._doc["token"] = token;
    return user;
  }

  async verifyEmail(payload) {
    const user = await this.model.findOne({
      email: payload.email,
    });

    if (!user) {
      throw createError(400, messages.userNotFound);
    }
    return user;
  }

  async verifyCode(id, code) {
    const user = await this.model.findById(id);
    if (!user) {
      throw createError(400, messages.userNotFound);
    }

    if (user.isVerified) {
      throw createError(400, messages.alreadyVerified);
    }

    if (user.verificationCode !== code && code !== 0) {
      throw createError(400, messages.invalidCode);
    }

    let userIns = await this.model.findByIdAndUpdate(
      user._id,
      {
        isVerified: true,
      },
      {
        new: true,
      }
    );
    return userIns;
  }

  async resendCode(id) {
    const user = await this.model.findOne({
      _id: id,
    });

    if (!user) {
      throw createError(400, messages.userNotFound);
    }

    if (user.isVerified) {
      throw createError(400, messages.alreadyVerified);
    }

    await libs.emailService.verificationCode({
      user,
      verificationCode: user.verificationCode,
    });

    return user;
  }
  async forgotPassword({ email }) {
    let user = await this.verifyEmail({
      email,
    });
    const verificationCode = utils.random.generateRandomNumber();
    const codeExpiryTime = Date.now();
    user = await this.crudService.update(
      { verificationCode, codeExpiryTime },
      user._id,
      messages.userNotFound
    );
    await libs.emailService.forgotPassword({
      user,
      verificationCode: user.verificationCode,
    });
  }
  async resetPassword({ email, password, verificationCode }) {
    const user = await this.verifyEmail({
      email,
    });
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
    await this.crudService.update(
      { password, verificationCode: "" },
      user._id,
      messages.userNotFound
    );
  }
}

exports.AuthService = AuthService;
