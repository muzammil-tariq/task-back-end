const RequestCrudService = new services.CrudService(models.Requests);
const AllVendor = mongoose.model("Vendors");
const AllRequests = mongoose.model("Requests");
exports.add = {
  request: async (req, res, next) => {
    try {
      const { body: payload } = req;
      //if it is already exists
      let exist = await models.Requests.findOne({
        eventId: mongoose.Types.ObjectId(payload["eventId"]),
      });
      if (exist) {
        throw createError(409, messages.alreadyExists("Request"));
      }
      payload["vendors"] = await AllVendor.find(
        { zipCode: payload["zipCode"] },
        { _id: 1, status: "pending" }
      );
      const requests = await RequestCrudService.add(payload);
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
