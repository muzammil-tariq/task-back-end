const meetingCrudService = new services.CrudService(models.Meetings);

exports.delete = async (req, res, next) => {
  try {
    const {
      params: { id },
      user: { _id: customerId },
    } = req;

    const data = await meetingCrudService.findOneAndUpdate(
      { isDeleted: true },
      {
        _id: id,
        customerId,
      },
      messages.notFound("Meeting")
    );

    return res.json({
      status: 200,
      message: messages.success,
      data,
    });
  } catch (error) {
    next(error);
  }
};
