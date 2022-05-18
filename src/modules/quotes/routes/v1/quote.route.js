router.post(
  "/quote/vendors",
  validators.quotes.quotePayload,
  middlewares.validation.request,
  actions.quotes.add.quote
);
module.exports = { prefix: "quote", router };
