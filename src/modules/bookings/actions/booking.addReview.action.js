module.exports.addReview = async (req, res, next) => {
  try {
    const {
      body: payload,
      params: { id: bookingId },
      user: { _id: customerId },
    } = req;
    const booking = await models.Bookings.findOne({
      _id: bookingId,
      customerId,
    });
    if (!booking) {
      throw createError(404, messages.notFound("Booking"));
    }
    if (booking.paymentStatus !== "paid") {
      throw createError(400, messages.cantAddReview);
    }
    if (
      booking.status !== "completed" &&
      booking.status !== "completedByCustomer"
    ) {
      throw createError(400, messages.missingStep("booking"));
    }
    const data = await models.Reviews.create({
      description: payload.description,
      rating: payload.rating,
      bookingId,
      vendorId: booking.vendorId,
      customerId,
    });
    return res.json({
      status: 200,
      message: messages.success,
      data,
    });
  } catch (err) {
    next(err);
  }
};
