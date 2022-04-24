router.post(
  "/events/customers",
  validators.events.addEventPayload,
  middlewares.validation.request,
  actions.events.add.event
);

router.patch("/events/customers/:id", actions.events.update.event);

router.get("/events/customers", actions.events.get.list);
router.get("/events/customers/:id", actions.events.get.byId);

module.exports = { prefix: "events", router };
