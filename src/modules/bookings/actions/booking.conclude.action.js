const { USER_ROLE } = constants;

const completedByOneSide = ["completedByCustomer", "completedByVendor"];

exports.conclude = async (req, res, next) => {
  try {
    const {
      body: payload,
      user: {
        _id: userId,
        collection: { modelName },
      },
    } = req;
    const booking = await models.Bookings.findOne({
      _id: payload.bookingId,
      $or: [
        {
          customerId: userId,
        },
        {
          vendorId: userId,
        },
      ],
    });
    const data = await models.Bookings.findOneAndUpdate(
      {
        _id: payload.bookingId,
      },
      {
        status: completedByOneSide.includes(booking.status)
          ? "completed"
          : modelName == USER_ROLE.CUSTOMER
          ? "completedByCustomer"
          : "completedByVendor",
      },
      { new: true }
    );

    return res.json({
      status: 200,
      message: messages.success,
      data,
    });
  } catch (error) {
    next(error);
  }
};