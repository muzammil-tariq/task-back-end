const { USER_ROLE } = constants;

const completedByOneSide = ["completedByCustomer", "completedByVendor"];

exports.conclude = async (req, res, next) => {
  try {
    const {
      params: { id: bookingId },
      user: {
        _id: userId,
        collection: { modelName },
      },
    } = req;
    const isCustomer = modelName === USER_ROLE.CUSTOMER;
    const isVendor = modelName === USER_ROLE.VENDOR;
    const booking = await models.Bookings.findOne({
      _id: bookingId,
      $or: [
        {
          customerId: userId,
        },
        {
          vendorId: userId,
        },
      ],
    });
    if (!booking) {
      throw createError(404, messages.notFound("Booking"));
    }
    if (booking.paymentStatus !== "paid") {
      throw createError(400, messages.bookingNotCompleted);
    }
    if (
      (booking.status === "completedByCustomer" && isCustomer) ||
      (booking.status === "completedByVendor" && isVendor)
    ) {
      return res.json({
        status: 200,
        message: messages.success,
        data: booking,
      });
    }
    const data = await models.Bookings.findOneAndUpdate(
      {
        _id: bookingId,
      },
      {
        status: completedByOneSide.includes(booking.status)
          ? "completed"
          : isCustomer
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
