class SettingsService {
  constructor(model) {
    this.model = model;
    this.userCrudService = new services.CrudService(model);
  }
  async changePassword({ existingPassword, password, user }) {
    if (!user.verifyPassword(existingPassword)) {
      throw createError(400, messages.invalidPassword);
    }
    if (existingPassword === password) {
      throw createError(400, messages.samePassword);
    }
    return await this.userCrudService.update(
      { password },
      user._id,
      messages.userNotFound
    );
  }
  async changeEmail({ email, user }) {
    if (user.email !== email) {
      const alreadyExists = await this.model.findOne({
        email,
      });
      if (alreadyExists) {
        throw createError(400, messages.emailExists);
      }
      const updatedUser = await this.userCrudService.update(
        { email, isVerified: false },
        user._id,
        messages.userNotFound
      );
      libs.emailService.verificationCode({
        user: updatedUser,
        verificationCode: updatedUser.verificationCode,
      });
      return user;
    }
  }
}
exports.SettingsService = SettingsService;
