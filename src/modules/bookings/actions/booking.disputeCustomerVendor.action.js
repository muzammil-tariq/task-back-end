exports.dispute = async (req, res, next) => {
  try {
    const {
      user,
      params: { id: bookingId },
    } = req;
    const modelName = user.collection.modelName;
    let data = await models.Bookings.findOneAndUpdate(
      { _id: bookingId },
      {
        disputeFilerId: user._id,
        disputeFilerModel: modelName,
        status: "disputed",
      },
      {
        new: true,
      }
    );
    return res.json({
      status: 200,
      msg: messages.success,
      data,
    });
  } catch (err) {
    next(err);
  }
};
