const { USER_ROLE } = constants;
router
  .post(
    "/bookings",
    validators.bookings.add,
    middlewares.validation.request,
    actions.bookings.create.booking
  )
  .post(
    "/bookings/order",
    middlewares.verifyUserRole(USER_ROLE.CUSTOMER),
    actions.bookings.createOrder
  )
  .patch(
    "/bookings/:id",
    middlewares.verifyUserRole(USER_ROLE.CUSTOMER),
    actions.bookings.update
  )
  .delete(
    "/bookings/:id",
    middlewares.verifyUserRole(USER_ROLE.CUSTOMER),
    actions.bookings.delete
  )
  .patch("/bookings/conclude", actions.bookings.customerVendor.status)
  .patch("/bookings/dispute", actions.bookings.disputeCustomerVendor.dispute)
  .get(
    "/bookings",
    validators.bookings.getList,
    middlewares.validation.request,
    actions.bookings.getList
  )
  .get(
    "/bookings/:id",
    validators.bookings.getById,
    middlewares.validation.request,
    actions.bookings.getById
  )
  .get(
    "/events/:eventId/bookings",
    validators.bookings.getEventBookings,
    middlewares.validation.request,
    actions.bookings.getEventBookings
  );

module.exports = { prefix: "booking", router };
