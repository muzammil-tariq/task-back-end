const EventCrudService = new services.CrudService(models.Events);

exports.add = {
  event: async (req, res, next) => {
    try {
      const {
        body: payload,
        user: { _id: customerId, location },
      } = req;

      payload["location"] = location;
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
