const RequestCrudService = new services.CrudService(models.Requests);

exports.add = {
  request: async (req, res, next) => {
    try {
      const { body: payload } = req;
      let alreadyExists = await models.Requests.findOne({
        eventId: mongoose.Types.ObjectId(payload["eventId"]),
      });
      if (alreadyExists) {
        throw createError(409, messages.alreadyExists("Request"));
      }
      payload["vendors"] = await models.Vendors.find(
        { zipCode: payload["zipCode"] },
        { _id: 1, status: "pending" }
      );
      await RequestCrudService.add(payload);
      return res.status(201).json({
        status: 201,
        message: messages.success,
        data: payload,
      });
    } catch (error) {
      next(error);
    }
  },
};
