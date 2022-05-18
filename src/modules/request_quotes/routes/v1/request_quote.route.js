router.post(
  "/requests/customers",
  validators.request_quotes.addRequestQuotePayload,
  middlewares.validation.request,
  actions.request_quotes.add.request
);
router.get("/requests/vendors", actions.request_quotes.getList.getRequest);

module.exports = { prefix: "requests", router };
