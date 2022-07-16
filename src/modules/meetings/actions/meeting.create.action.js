const MeetingCrudService = new services.CrudService(models.Meetings);
exports.create = {
  meeting: async (req, res, next) => {
    try {
      const {
        body: payload,
        user: { _id: userId },
        user,
      } = req;

      const vendor = await models.Vendors.findById(payload.vendorId);
      if (!vendor) {
        throw createError(404, messages.notFound("Vendor"));
      }
      payload["customerId"] = userId;

      const data = await MeetingCrudService.add(
        _.omit(payload, ["isDeleted", "createdAt", "updatedAt"])
      );

      return res.status(201).json({
        status: 201,
        message: messages.success,
        data,
      });
    } catch (err) {
      next(err);
    }
  },
};
