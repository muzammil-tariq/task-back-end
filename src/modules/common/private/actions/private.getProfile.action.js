const { USER_ROLE } = constants;
exports.getUserProfile = async (req, res, next) => {
  try {
    const { user } = req;
    const modelName = user.collection.modelName;
    let data;
    if (modelName == USER_ROLE.CUSTOMER) {
      data = await models.Customers.findOne({ _id: user.id });
    } else if (modelName == USER_ROLE.VENDOR) {
      data = await models.Vendors.findOne({ _id: user.id });
    } else {
      throw createError(400, messages.invalidModel);
    }
    return res.json({
      status: 200,
      message: messages.success,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
