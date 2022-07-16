const meetingCrudService = new services.CrudService(models.Meetings);
const strongParams = [
  "createdAt",
  "updatedAt",
  "vendorId",
  "customerId",
  "isDeleted",
];

exports.update = async (req, res, next) => {
  try {
    const {
      body: payload,
      params: { id },
      user: { _id: customerId },
    } = req;

    const data = await meetingCrudService.findOneAndUpdate(
      _.omit(payload, strongParams),
      { _id: id, customerId },
      messages.notFound("Meeting")
    );

    return res.json({
      status: 200,
      message: messages.updatedModel("Meeting"),
      data,
    });
  } catch (error) {
    next(error);
  }
};
