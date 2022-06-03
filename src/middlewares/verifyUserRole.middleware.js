const { USER_ROLE } = constants;

exports.customer = (req, res, next) => {
  try {
    const { user } = req;
    if (user.collection.modelName === USER_ROLE.CUSTOMER) {
      next();
    } else {
      throw createError(403, messages.forbidden);
    }
  } catch (error) {
    next(error);
  }
};
exports.vendor = (req, res, next) => {
  try {
    const { user } = req;
    if (user.collection.modelName === USER_ROLE.VENDOR) {
      next();
    } else {
      throw createError(403, messages.forbidden);
    }
  } catch (error) {
    next(error);
  }
};
