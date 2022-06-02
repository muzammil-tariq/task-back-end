const QuoteCrudService = new services.CrudService(models.Quotes);
exports.add = {
  quote: async (req, res, next) => {
    try {
      const {
        user: { _id: vendorId },
        params: { id: eventId },
        body: payload,
      } = req;
      const event = await models.Events.findOne({
        _id: mongoose.Types.ObjectId(eventId),
      });
      if (!event) {
        throw createError(400, messages.notFound("Event"));
      }
      const alreadyExists = await models.Quotes.findOne({
        eventId: mongoose.Types.ObjectId(eventId),
        vendorId: mongoose.Types.ObjectId(vendorId),
      });
      if (alreadyExists) {
        throw createError(409, messages.alreadyExists("Quote"));
      }
      const quote = await QuoteCrudService.add({
        ...payload,
        eventId,
        vendorId,
      });
      await models.Requests.findOneAndUpdate(
        {
          eventId: mongoose.Types.ObjectId(eventId),
          "vendors._id": { $in: [vendorId] },
        },
        {
          "vendors.$.status": "accepted",
          "vendors.$.quote": mongoose.Types.ObjectId(quote.id),
        }
      );

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
