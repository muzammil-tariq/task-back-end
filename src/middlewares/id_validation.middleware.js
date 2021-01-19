exports.validateId = (req, res, next) => {
  const {
    params: { id },
  } = req;
  if (!mongoose.Types.ObjectId.isValid(id))
    throw createError(400, messages.invalidId);
  next();
};
