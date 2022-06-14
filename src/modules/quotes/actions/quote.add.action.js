const QuoteCrudService = new services.CrudService(models.Quotes);
const { EVENT_REQUEST_DISTANCE } = constants;

exports.add = {
  quote: async (req, res, next) => {
    try {
      const {
        user: {
          _id: vendorId,
          paypalMerchantId,
          location: { coordinates },
        },
        params: { id: eventId },
        body: payload,
      } = req;
      if (!paypalMerchantId) {
        throw createError(400, messages.paypalNotConnected);
      }
      const alreadyExists = await models.Quotes.findOne({
        eventId: mongoose.Types.ObjectId(eventId),
        vendorId: mongoose.Types.ObjectId(vendorId),
      });
      if (alreadyExists) {
        throw createError(409, messages.alreadyExists("Quote"));
      }
      const event = await models.Events.findOne({
        _id: eventId,
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates,
            },
            $maxDistance: EVENT_REQUEST_DISTANCE,
          },
        },
      });
      if (!event) {
        throw createError(400, messages.notFound("Event"));
      }

      const quote = await QuoteCrudService.add({
        ...payload,
        eventId,
        vendorId,
        customerId: event.customerId,
      });

      res.status(201).json({
        status: 201,
        message: messages.success,
        data: quote,
      });
    } catch (error) {
      next(error);
    }
  },
};
