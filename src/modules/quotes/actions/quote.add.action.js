const QuoteCrudService = new services.CrudService(models.Quotes);
exports.add = {
  quote: async (req, res, next) => {
    try {
      const {
        user: { _id: vendorId },
        body: payload,
      } = req;
      const exist = await models.Quotes.findOne({
        eventId: mongoose.Types.ObjectId(payload["eventId"]),
      });
      if (exist) {
        throw createError(409, messages.alreadyExists("Quote"));
      }
      const quote = await QuoteCrudService.add(payload);
      await models.Requests.findOneAndUpdate(
        {
          eventId: mongoose.Types.ObjectId(payload.eventId),
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
