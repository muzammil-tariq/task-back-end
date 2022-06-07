const NewsLetterCrudService = new services.CrudService(models.NewsLetter);

exports.add = {
  create: async (req, res, next) => {
    try {
      const { body: payload } = req;
      const alreadyExist = await models.NewsLetter.findOne({
        email: payload.mail,
      });
      if (alreadyExist)
        throw createError(400, messages.alreadyExists(payload.email));
      const newsLetter = await NewsLetterCrudService.add(payload);
      const user = {
        email: payload.email,
      };
      await libs.email_service.sendEmailToSubscriber(user);
      return res.json({
        status: 201,
        message: messages.created("email"),
        data: newsLetter,
      });
    } catch (error) {
      next(error);
    }
  },
};
