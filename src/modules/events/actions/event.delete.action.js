const eventCrudService = new services.CrudService(models.Events);

exports.delete = async (req, res, next) => {
  try {
    const {
      params: { id },
      user: { _id: customerId },
    } = req;

    const event = await eventCrudService.findOneAndUpdate(
      { isDeleted: true },
      { _id: id, customerId },
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
