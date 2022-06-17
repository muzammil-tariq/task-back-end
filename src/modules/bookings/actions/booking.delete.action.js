const bookingCrudService = new services.CrudService(models.Bookings);

exports.delete = async (req, res, next) => {
  try {
    const {
      params: { id },
      user: { _id: customerId },
    } = req;

    const booking = await bookingCrudService.findOneAndUpdate(
      { isDeleted: true },
      {
        _id: id,
        customerId,
        status: {
          $nin: ["completedByCustomer", "completedByVendor", "completed"],
        },
      },
      messages.notFound("Booking")
    );

    return res.json({
      status: 200,
      message: messages.success,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};
