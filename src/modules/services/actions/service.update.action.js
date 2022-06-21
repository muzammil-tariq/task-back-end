const serviceCrud = new services.CrudService(models.Services);

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
};
