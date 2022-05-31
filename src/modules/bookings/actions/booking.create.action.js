const BookingCrudService = new services.CrudService(models.Bookings);
exports.create = {
  booking: async (req, res, next) => {
    try {
      const { body: payload } = req;
      //if it is already exists
      const exist = await models.Bookings.findOne({
        eventId: mongoose.Types.ObjectId(payload["eventId"]),
        quoteId: mongoose.Types.ObjectId(payload["quoteId"]),
      });
      if (exist) {
        throw createError(409, messages.alreadyExists("Booking"));
      }

      const requests = await BookingCrudService.add(payload);

      return res.status(201).json({
        status: 201,
        message: messages.success,
        data: payload,
      });
    } catch (error) {
      next(error);
    }
  },
};
