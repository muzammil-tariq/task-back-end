const BoookingCrudService = new services.CrudService(models.Bookings);
exports.customerVendor = {
  status: async (req, res, next) => {
    try {
      const { user, body: payload } = req;
      let model = req.user.getModelType();
      let data;
      if (model == "customers") {
        data = await models.Bookings.updateOne(
          {
            _id: payload.bookingId,
          },
          {
            "endedBy.customerEnded": "true",
          },
          { new: true }
        );
      } else if (model == "vendors") {
        data = await models.Bookings.findOneAndUpdate(
          {
            _id: payload.bookingId,
          },
          {
            "endedBy.vendorEnded": "true",
          },
          { new: true }
        );
      } else {
        throw createError(400, "Invalid model type");
      }
      let see = await models.Bookings.findOneAndUpdate(
        {
          _id: payload.bookingId,
          "endedBy.customerEnded": "true",
          "endedBy.vendorEnded": "true",
        },
        {
          status: "completed",
        }
      );

      const result = see;
      return res.json({
        status: 200,
        message: messages.success,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
};
