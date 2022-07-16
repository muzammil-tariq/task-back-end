module.exports.get = async (req, res, next) => {
  try {
    const data = await helpers.setting.get();
    return res.json({
      status: 200,
      message: messages.success,
      data,
    });
  } catch (err) {
    next(err);
  }
};
