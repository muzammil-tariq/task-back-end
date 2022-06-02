const EventCrudService = new services.CrudService(models.Events);

exports.add = {
  event: async (req, res, next) => {
    try {
      const {
        body: payload,
        user: { _id: customerId },
      } = req;

      const alreadyExist = await models.Events.findOne({
        scheduledDate: payload.scheduledDate,
        startTime: payload.startTime,
        endTime: payload.endTime,
      });

      if (alreadyExist) throw createError(400, messages.eventAlreadyExists);

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
