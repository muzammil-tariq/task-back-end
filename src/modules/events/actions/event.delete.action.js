const eventCrudService = new services.CrudService(models.Events);

exports.delete = async (req, res, next) => {
  try {
    const {
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
      { isDeleted: true },
      id,
      messages.notFound("Event")
    );

    return res.json({
      status: 200,
      message: messages.success,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};
