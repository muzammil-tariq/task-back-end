module.exports = (...permittedRoles) => {
  return (req, res, next) => {
    try {
      const { user } = req;
      if (permittedRoles.includes(user.collection.modelName)) {
        next();
      } else {
        throw createError(403, messages.forbidden);
      }
    } catch (error) {
      next(error);
    }
  };
};
