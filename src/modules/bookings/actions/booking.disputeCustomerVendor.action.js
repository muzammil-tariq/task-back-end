exports.dispute = async (req, res, next) => {
  try {
    const { user, body: payload } = req;
    const modelName = user.collection.modelName;
    let data = await models.Bookings.findOneAndUpdate(
      { _id: payload.bookingId },
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
