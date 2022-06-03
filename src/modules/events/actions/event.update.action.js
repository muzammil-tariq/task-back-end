const eventCrudService = new services.CrudService(models.Events);

exports.update = {
  event: async (req, res, next) => {
    try {
      const {
        body: payload,
        params: { id },
        user: { _id: customerId },
      } = req;

      const isEventBelongsToCustomer = await models.Events.findOne({
        customer: customerId,
        _id: id,
      });
      if (!isEventBelongsToCustomer)
        throw createError(404, messages.eventNotForThisCustomer);

      const event = await eventCrudService.update(
        payload,
        id,
        messages.notFound("Event")
      );

      return res.json({
        status: 200,
        message: messages.updatedModel("Category"),
        data: event,
      });
    } catch (error) {
      next(error);
    }
  },
};
