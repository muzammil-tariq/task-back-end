const eventCrudService = new services.CrudService(models.Events);
const eventTypeCrudService = new services.CrudService(models.EventTypes);

const strongParams = [
  "createdAt",
  "updatedAt",
  "status",
  "location",
  "isDeleted",
  "customerId",
];

const eventTypeStrongParams = ["createdAt", "updatedAt", "isDeleted"];

exports.update = {
  info: async (req, res, next) => {
    try {
      const {
        body: payload,
        params: { id },
        user: { _id: customerId },
      } = req;

      const event = await eventCrudService.findOneAndUpdate(
        _.omit(payload, strongParams),
        { _id: id, customerId },
        messages.notFound("Event")
      );

      return res.json({
        status: 200,
        message: messages.updatedModel("Event"),
        data: event,
      });
    } catch (error) {
      next(error);
    }
  },
  cancel: async (req, res, next) => {
    try {
      const {
        params: { id },
        user: { _id: customerId },
      } = req;

      const event = await eventCrudService.findOneAndUpdate(
        { status: "canceled" },
        { _id: id, customerId },
        messages.notFound("Event")
      );

      return res.json({
        status: 200,
        message: messages.updatedModel("Event"),
        data: event,
      });
    } catch (error) {
      next(error);
    }
  },
  complete: async (req, res, next) => {
    try {
      const {
        params: { id },
        user: { _id: customerId },
      } = req;

      const event = await eventCrudService.findOneAndUpdate(
        { status: "completed" },
        { _id: id, customerId },
        messages.notFound("Event")
      );

      return res.json({
        status: 200,
        message: messages.updatedModel("Event"),
        data: event,
      });
    } catch (error) {
      next(error);
    }
  },
  eventType: async (req, res, next) => {
    try {
      const {
        body,
        params: { id },
      } = req;

      const data = await eventTypeCrudService.findOneAndUpdate(
        _.omit(body, eventTypeStrongParams),
        { _id: id },
        messages.notFound("EventType")
      );

      return res.json({
        status: 200,
        message: messages.updatedModel("EventType"),
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
