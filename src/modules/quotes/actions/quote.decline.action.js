const quoteCrudService = new services.CrudService(models.Quotes);

exports.decline = async (req, res, next) => {
  try {
    const {
      params: { id },
      user: { _id: customerId },
    } = req;

    const quote = await quoteCrudService.findOneAndUpdate(
      {
        status: "declined",
      },
      { _id: id, customerId },
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
