const NewsLetterCrudService = new services.CrudService(models.NewsLetter);

exports.add = {
  create: async (req, res, next) => {
    try {
      const {
        body: { email },
        user: { _id, email: userEmail },
      } = req;
      const alreadyExist = await models.NewsLetter.findOne({
        email,
      });
      if (alreadyExist) throw createError(400, messages.alreadyExists(email));
      const clauses = {
        email: userEmail ?? email,
      };
      _id && (clauses.userId = _id);
      const newsLetter = await NewsLetterCrudService.add(clauses);
      await libs.emailService.sendEmailToSubscriber({
        email: userEmail ?? email,
      });
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
