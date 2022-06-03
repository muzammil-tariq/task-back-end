const EventCrudService = new services.CrudService(models.Events);

exports.add = {
  event: async (req, res, next) => {
    try {
      const {
        body: payload,
        user: { _id: customerId, zipCode },
      } = req;

      const alreadyExist = await models.Events.findOne({
        scheduledDate: payload.scheduledDate,
        startTime: payload.startTime,
        endTime: payload.endTime,
      });

      if (alreadyExist) throw createError(400, messages.eventAlreadyExists);

      const vendors = await models.Vendors.find({ zipCode }, { _id: 1 });

      const vendorIds = vendors.map((item) => item._id);
      payload["vendorIds"] = vendorIds;
      payload["customerId"] = customerId;

      const event = await EventCrudService.add(payload);

      return res.json({
        status: 201,
        message: messages.created("Event"),
        data: event,
      });
    } catch (error) {
      next(error);
    }
  },
};
