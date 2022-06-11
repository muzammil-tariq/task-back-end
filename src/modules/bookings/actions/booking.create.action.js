const BookingCrudService = new services.CrudService(models.Bookings);
exports.create = {
  booking: async (req, res, next) => {
    try {
      const {
        body: payload,
        user: { _id: userId },
      } = req;
      const alreadyExists = await models.Bookings.findOne({
        eventId: mongoose.Types.ObjectId(payload["eventId"]),
        quoteId: mongoose.Types.ObjectId(payload["quoteId"]),
      });

      if (alreadyExists) {
        throw createError(409, messages.alreadyExists("Booking"));
      }
      const event = await models.Events.findOne({
        _id: mongoose.Types.ObjectId(payload["eventId"]),
        customerId: mongoose.Types.ObjectId(userId),
      });
      if (!event) {
        throw createError(404, messages.notFound("Event"));
      }
      payload["customerId"] = userId;

      const booking = await BookingCrudService.add(
        _.omit(payload, ["paypalOrderId", "status"])
      );

      return res.status(201).json({
        status: 201,
        message: messages.success,
        data: booking,
      });
    } catch (err) {
      next(err);
    }
  },
};
