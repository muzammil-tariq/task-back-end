module.exports.get = async (req, res, next) => {
  try {
    const data = await models.Settings.findOne().select([
      "-createdAt",
      "-updatedAt",
      "-_id",
      "-__v",
    ]);
    return res.json({
      status: 200,
      message: messages.success,
      data,
    });
  } catch (err) {
    next(err);
  }
};
