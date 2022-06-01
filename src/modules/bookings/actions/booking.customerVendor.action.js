const { USER_ROLE } = constants;

exports.customerVendor = {
  status: async (req, res, next) => {
    try {
      const { body: payload, user } = req;
      const modelName = user.collection.modelName;
      let data;
      if (modelName == USER_ROLE.CUSTOMER) {
        data = await models.Bookings.updateOne(
          {
            _id: payload.bookingId,
          },
          {
            "endedBy.customerEnded": "true",
          },
          { new: true }
        );
      } else if (modelName == USER_ROLE.CUSTOMER) {
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
        throw createError(400, messages.invalidModel);
      }
      models.Bookings.findOneAndUpdate(
        {
          _id: payload.bookingId,
          "endedBy.customerEnded": "true",
          "endedBy.vendorEnded": "true",
        },
        {
          status: "completed",
        }
      ).exec();

      return res.json({
        status: 200,
        message: messages.success,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
