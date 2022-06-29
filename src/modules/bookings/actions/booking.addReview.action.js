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
    updateVendorRating({ vendorId: booking.vendorId });
    return res.json({
      status: 200,
      message: messages.success,
      data,
    });
  } catch (err) {
    next(err);
  }
};

async function updateVendorRating({ vendorId }) {
  const reviews = await models.Reviews.aggregate([
    {
      $match: {
        vendorId: mongoose.Types.ObjectId(vendorId),
      },
    },
    {
      $group: {
        _id: {
          vendorId: "$vendorId",
        },
        rating: {
          $sum: "$rating",
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  const rating = (
    reviews[0]?.rating ? reviews[0]?.rating / reviews[0]?.count : 0
  ).toFixed(2);
  await models.Vendors.updateOne({ _id: vendorId }, { rating });
}
