router.post(
  "/events",
  middlewares.verifyUserRole.customer,
  validators.events.addEventPayload,
  middlewares.validation.request,
  actions.events.add.event
);

router.patch(
  "/events/:id",
  middlewares.verifyUserRole.customer,
  actions.events.update.event
);

router.get("/events/customers", actions.events.get.list);
router.get("/events/customers/:id", actions.events.get.byId);

module.exports = { prefix: "events", router };
