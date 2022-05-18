const RequestCrudService = new services.CrudService(models.Requests);
const requests = mongoose.model("Requests");
exports.getList = {
  getRequest: async (req, res, next) => {
    try {
      const {
        user: { _id: vendorId },
        body: payload,
      } = req;
      let eventAvailable = await requests
        .find({
          "vendors._id": { $in: [vendorId] },
        })
        .populate("eventId");

      res.status(200).json({ message: "Events", data: eventAvailable });
    } catch (err) {
      console.log(err);

      res.status(400).json({ message: err });
    }
  },
};
