router.post(
  "/events/:id/quotes",
  middlewares.verifyUserRole.vendor,
  validators.quotes.add,
  middlewares.validation.request,
  actions.quotes.add.quote
);
module.exports = { prefix: "quote", router };
