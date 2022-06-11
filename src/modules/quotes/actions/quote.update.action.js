const quoteCrudService = new services.CrudService(models.Quotes);
const strongParams = [
  "vendorId",
  "eventId",
  "customerId",
  "status",
  "isDeleted",
];

exports.update = async (req, res, next) => {
  try {
    const {
      body: payload,
      params: { id },
      user: { _id: vendorId },
    } = req;

    const quote = await quoteCrudService.findOneAndUpdate(
      _.omit(payload, strongParams),
      { _id: id, vendorId },
      messages.notFound("Quote")
    );

    return res.json({
      status: 200,
      message: messages.updatedModel("Quote"),
      data: quote,
    });
  } catch (error) {
    next(error);
  }
};
