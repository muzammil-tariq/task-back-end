const serviceCrudService = new services.CrudService(models.Services);

exports.add = {
  service: async (req, res, next) => {
    try {
      const { body } = req;
      const data = await serviceCrudService.add(body);

      return res.json({
        status: 201,
        message: messages.created("Service"),
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
