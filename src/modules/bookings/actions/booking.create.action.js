const BookingCrudService = new services.CrudService(models.Bookings);
exports.create = {
  booking: async (req, res, next) => {
    try {
      const { body: payload, user } = req;
      const alreadyExists = await models.Bookings.findOne({
        eventId: mongoose.Types.ObjectId(payload["eventId"]),
        quoteId: mongoose.Types.ObjectId(payload["quoteId"]),
      });

      if (alreadyExists) {
        throw createError(409, messages.alreadyExists("Booking"));
      }
      payload["customerId"] = user.id;

      await BookingCrudService.add(payload);

      return res.status(201).json({
        status: 201,
        message: messages.success,
        data: payload,
      });
    } catch (err) {
      next(err);
    }
  },
};
