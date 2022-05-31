const BookingCrudService = new services.CrudService(models.Bookings);

exports.disputeCustomerVendor = {
  dispute: async (req, res, next) => {
    try {
      const { user, body: payload } = req;
      let model = req.user.getModelType();
      let data = await models.Bookings.findOneAndUpdate(
        { _id: payload.bookingId },
        {
          disputeFiler: user._id,
          onModel: model,
          status: "disputed",
        },
        {
          new: true,
        }
      );
      return res.status(200).json({ msg: messages.success, data: data });
    } catch (err) {
      next(err);
    }
  },
};
