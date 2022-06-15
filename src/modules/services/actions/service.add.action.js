const serviceCrudService = new services.CrudService(models.Services);
const subServiceCrudService = new services.CrudService(models.SubServices);

exports.add = {
  service: async (req, res, next) => {
    try {
      const { body } = req;
      const data = await serviceCrudService.add(body);

      return res.json({
        status: 201,
        message: messages.created("Categories"),
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

      const service = await models.Services.findById({ _id: id });
      if (!service) {
        throw createError(404, messages.notFound("Service"));
      }

      payload["serviceId"] = id;
      const data = await subServiceCrudService.add(payload);

      return res.json({
        status: 200,
        message: messages.updatedModel("SubService"),
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
