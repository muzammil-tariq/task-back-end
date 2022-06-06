router.post(
  "/bookings",
  validators.bookings.add,
  middlewares.validation.request,
  actions.bookings.create.booking
);
router.patch("/bookings/conclude", actions.bookings.customerVendor.status);
router.patch(
  "/bookings/dispute",
  actions.bookings.disputeCustomerVendor.dispute
);
router
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
