const EventCrudService = new services.CrudService(models.Events);
const EventTypeCrudService = new services.CrudService(models.EventTypes);

exports.add = {
  event: async (req, res, next) => {
    try {
      const {
        body: payload,
        user: { _id: customerId },
      } = req;

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
  eventType: async (req, res, next) => {
    try {
      const { body: payload } = req;

      const data = await EventTypeCrudService.add(payload);

      return res.json({
        status: 200,
        message: messages.created("EventType"),
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
