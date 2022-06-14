const eventCrudService = new services.CrudService(models.Events);
const strongParams = [
  "createdAt",
  "updatedAt",
  "status",
  "location",
  "isDeleted",
  "customerId",
];

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
};
