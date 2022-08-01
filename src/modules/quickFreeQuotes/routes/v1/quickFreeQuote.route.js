router.post(
  "/quickFreeQuote/vendors/:id",
  validators.quickFreeQuotes.add,
  middlewares.validation.request,
  actions.quickFreeQuotes.create
);

module.exports = { prefix: "quickFreeQuote", router };
