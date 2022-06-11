const eventCrudService = new services.CrudService(models.Events);
const strongParams = ["status", "location", "isDeleted"];

exports.update = async (req, res, next) => {
  try {
    const {
      body: payload,
      params: { id },
      user: { _id: customerId },
    } = req;

    const doesEventBelongsToCustomer = await models.Events.findOne({
      customer: customerId,
      _id: id,
    });
    if (!doesEventBelongsToCustomer)
      throw createError(403, messages.eventNotForThisCustomer);

    const event = await eventCrudService.update(
      _.omit(payload, strongParams),
      id,
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
};
