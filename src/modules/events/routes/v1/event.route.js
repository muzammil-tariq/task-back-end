router.post(
  "/events/customers",
  validators.events.addEventPayload,
  middlewares.validation.request,
  actions.events.add.event
);

module.exports = { prefix: "events", router };
