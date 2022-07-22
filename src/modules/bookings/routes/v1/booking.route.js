const { USER_ROLE } = constants;
router
  .post(
    "/bookings",
    middlewares.verifyUserRole(USER_ROLE.CUSTOMER),
    middlewares.removeNullishValuesFromBody,
    validators.bookings.add,
    middlewares.validation.request,
    actions.bookings.create.booking
  )
  .post(
    "/bookings/:id/order",
    middlewares.verifyUserRole(USER_ROLE.CUSTOMER),
    actions.bookings.createOrder
  )
  .patch(
    "/bookings/:id",
    middlewares.verifyUserRole(USER_ROLE.CUSTOMER),
    actions.bookings.update
  )
  .post(
    "/bookings/:id/review",
    middlewares.verifyUserRole(USER_ROLE.CUSTOMER),
    validators.bookings.addReview,
    middlewares.validation.request,
    actions.bookings.addReview
  )
  .delete(
    "/bookings/:id",
    middlewares.verifyUserRole(USER_ROLE.CUSTOMER),
    actions.bookings.delete
  )
  .patch("/bookings/:id/conclude", actions.bookings.conclude)
  .patch("/bookings/:id/dispute", actions.bookings.dispute)
  .get(
    "/bookings",
    validators.bookings.getList,
    middlewares.validation.request,
    actions.bookings.get.list
  )
  .get(
    "/bookings/vendors/:id",
    middlewares.verifyUserRole(USER_ROLE.ADMIN),
    validators.bookings.getList,
    validators.common.getById,
    middlewares.validation.request,
    actions.bookings.get.listByVendorId
  )
  .get(
    "/bookings/customers/:id",
    middlewares.verifyUserRole(USER_ROLE.ADMIN),
    validators.bookings.getList,
    validators.common.getById,
    middlewares.validation.request,
    actions.bookings.get.listByCustomerId
  )
  .get(
    "/bookings/:id",
    validators.bookings.getById,
    middlewares.validation.request,
    actions.bookings.get.byId
  )
  .get(
    "/events/:eventId/bookings",
    validators.bookings.getEventBookings,
    validators.bookings.getList,
    middlewares.validation.request,
    actions.bookings.get.eventBookings
  );

module.exports = { prefix: "booking", router };
