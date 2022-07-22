const quoteCrudService = new services.CrudService(models.Quotes);

exports.delete = async (req, res, next) => {
  try {
    const {
      params: { id },
      user: { _id: vendorId },
    } = req;

    const quote = await quoteCrudService.findOneAndUpdate(
      { isDeleted: true },
      { _id: id, vendorId },
      messages.notFound("Quote")
    );

    return res.json({
      status: 200,
      message: messages.success,
      data: quote,
    });
  } catch (error) {
    next(error);
  }
};
