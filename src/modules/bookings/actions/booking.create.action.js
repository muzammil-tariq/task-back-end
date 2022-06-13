const BookingCrudService = new services.CrudService(models.Bookings);
exports.create = {
  booking: async (req, res, next) => {
    try {
      const {
        body: payload,
        user: { _id: userId },
      } = req;

      const event = await models.Events.findOne({
        _id: payload["eventId"],
        customerId: userId,
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
