module.exports.update = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const data = await models.Settings.findOneAndUpdate(
      {},
      _.omit(payload, ["createdAt", "updatedAt"]),
      { new: true }
    );
    return res.json({
      status: 200,
      message: messages.success,
      data,
    });
  } catch (err) {
    next(err);
  }
};
