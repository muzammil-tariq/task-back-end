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
  actions.events.update.info
);
router.patch(
  "/events/:id/cancel",
  middlewares.verifyUserRole(USER_ROLE.CUSTOMER),
  actions.events.update.cancel
);
router.patch(
  "/events/:id/complete",
  middlewares.verifyUserRole(USER_ROLE.CUSTOMER),
  actions.events.update.complete
);
router.delete(
  "/events/:id",
  middlewares.verifyUserRole(USER_ROLE.CUSTOMER),
  actions.events.delete
);
router.get(
  "/events/upcomingEvent",
  middlewares.verifyUserRole(USER_ROLE.CUSTOMER),
  actions.events.get.upcomingEvent
);
router.get(
  "/events",
  validators.common.getList,
  middlewares.validation.request,
  actions.events.get.list
);
router.get(
  "/events/vendors/:id",
  middlewares.verifyUserRole(USER_ROLE.ADMIN),
  validators.common.getList,
  validators.common.getById,
  middlewares.validation.request,
  actions.events.get.listByVendorId
);
router.get(
  "/events/customers/:id",
  middlewares.verifyUserRole(USER_ROLE.ADMIN),
  validators.common.getList,
  validators.common.getById,
  middlewares.validation.request,
  actions.events.get.listByCustomerId
);
router.get(
  "/events/:id",
  validators.common.getById,
  middlewares.validation.request,
  actions.events.get.byId
);
router
  .post(
    "/events/types",
    middlewares.verifyUserRole(USER_ROLE.ADMIN),
    validators.events.addEventTypePayload,
    middlewares.validation.request,
    actions.events.add.eventType
  )
  .patch(
    "/events/types/:id",
    middlewares.verifyUserRole(USER_ROLE.ADMIN),
    validators.events.updateEventTypePayload,
    middlewares.validation.request,
    actions.events.update.eventType
  )
  .get("/events/types", actions.events.get.eventTypes);

module.exports = { prefix: "events", router };
