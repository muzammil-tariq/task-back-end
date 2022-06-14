const eventCrudService = new services.CrudService(models.Events);
const strongParams = [
  "createdAt",
  "updatedAt",
  "status",
  "location",
  "isDeleted",
  "customerId",
];

exports.update = async (req, res, next) => {
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
};
