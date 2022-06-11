const { USER_ROLE } = constants;

router
  .post(
    "/events/:id/quotes",
    middlewares.verifyUserRole(USER_ROLE.VENDOR),
    validators.quotes.add,
    middlewares.validation.request,
    actions.quotes.add.quote
  )
  .get(
    "/quotes",
    validators.quotes.getList,
    middlewares.validation.request,
    actions.quotes.getList
  )
  .get(
    "/quotes/:id",
    validators.common.getById,
    middlewares.validation.request,
    actions.quotes.getById
  )
  .get(
    "/events/:eventId/quotes",
    validators.quotes.getEventQuotes,
    middlewares.validation.request,
    actions.quotes.getEventQuotes
  );
module.exports = { prefix: "quote", router };
