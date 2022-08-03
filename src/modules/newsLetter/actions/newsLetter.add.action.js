const NewsLetterCrudService = new services.CrudService(models.NewsLetter);

exports.add = {
  create: async (req, res, next) => {
    try {
      const {
        body: { email },
      } = req;
      const alreadyExist = await models.NewsLetter.findOne({
        email,
      });
      if (alreadyExist) throw createError(400, messages.alreadyExists(email));
      const clauses = {
        email: req?.user?.email ?? email,
      };
      req?.user?._id && (clauses.userId = req?.user?._id);
      const newsLetter = await NewsLetterCrudService.add(clauses);
      await libs.emailService.quickFreeQuote({
        email: req?.user?.email ?? email,
      });
      return res.json({
        status: 201,
        message: messages.success,
        data: newsLetter,
      });
    } catch (error) {
      next(error);
    }
  },
};
