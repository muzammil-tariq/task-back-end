const { USER_ROLE } = constants;

router.post(
  "/events",
  middlewares.verifyUserRole(USER_ROLE.CUSTOMER),
  validators.events.addEventPayload,
  middlewares.validation.request,
  actions.events.add.event
);

router.patch(
  "/events/:id",
  middlewares.verifyUserRole(USER_ROLE.CUSTOMER),
  actions.events.update.event
);
router.get(
  "/events/upcomingEvent",
  middlewares.verifyUserRole(USER_ROLE.CUSTOMER),
  actions.events.get.upcomingEvent
);
router.get("/events/customers", actions.events.get.list);
router.get("/events/customers/:id", actions.events.get.byId);

module.exports = { prefix: "events", router };
