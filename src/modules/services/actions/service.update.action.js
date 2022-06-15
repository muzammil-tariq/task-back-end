const serviceCrud = new services.CrudService(models.Services);
const subServiceCrud = new services.CrudService(models.SubServices);

exports.update = {
  service: async (req, res, next) => {
    try {
      const {
        body: payload,
        params: { id },
      } = req;

      const data = await serviceCrud.update(
        payload,
        id,
        messages.notFound("Service")
      );

      return res.json({
        status: 200,
        message: messages.updatedModel("Service"),
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  subService: async (req, res, next) => {
    try {
      const {
        body: payload,
        params: { id },
      } = req;

      const records = await subServiceCrud.update(
        _.omit(payload, "isDeleted"),
        id,
        messages.notFound("SubService")
      );

      return res.json({
        status: 200,
        message: messages.updatedModel("SubService"),
        data: records,
      });
    } catch (error) {
      next(error);
    }
  },
};
