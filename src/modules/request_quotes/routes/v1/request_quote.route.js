router.post("/requests/customers", actions.request_quotes.add.request);
router.get("/requests/vendors", actions.request_quotes.getList.getRequest);

module.exports = { prefix: "requests", router };
