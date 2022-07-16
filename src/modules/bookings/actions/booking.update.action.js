const bookingCrudService = new services.CrudService(models.Bookings);
const strongParams = [
  "createdAt",
  "updatedAt",
  "eventId",
  "vendorId",
  "meetingId",
  "customerId",
  "status",
  "disputeFilerId",
  "disputeFilerModel",
  "paypalOrderId",
  "isDeleted",
];

exports.update = async (req, res, next) => {
  try {
    const {
      body: payload,
      params: { id },
      user: { _id: customerId },
    } = req;

    const booking = await bookingCrudService.findOneAndUpdate(
      _.omit(payload, strongParams),
      { _id: id, customerId },
      messages.notFound("Booking")
    );

    return res.json({
      status: 200,
      message: messages.updatedModel("Booking"),
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};
