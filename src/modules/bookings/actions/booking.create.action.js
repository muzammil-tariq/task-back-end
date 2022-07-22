const BookingCrudService = new services.CrudService(models.Bookings);
exports.create = {
  booking: async (req, res, next) => {
    try {
      const {
        body: payload,
        user: { _id: userId },
        user,
      } = req;

      const event = await models.Events.findOne({
        _id: payload["eventId"],
        customerId: userId,
      });
      if (!event) {
        throw createError(404, messages.notFound("Event"));
      }
      const vendor = await models.Vendors.findById(payload.vendorId);
      if (!vendor) {
        throw createError(404, messages.notFound("Vendor"));
      }
      if (payload.meetingId) {
        const meeting = await models.Meetings.findOne({
          _id: payload["meetingId"],
          customerId: userId,
          isDeleted: false,
        });
        if (!meeting) {
          throw createError(404, messages.notFound("Meeting"));
        }
      }
      payload["customerId"] = userId;

      const booking = await BookingCrudService.add(
        _.omit(payload, ["paypalOrderId", "status"])
      );

      libs.emailService.customerBooking({
        user,
      });
      libs.emailService.vendorBooking({
        user: vendor,
        event,
      });

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
