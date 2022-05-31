router.post(
  "/bookings",
  validators.bookings.addBookingPayload,
  middlewares.validation.request,
  actions.bookings.create.booking
);
router.patch("/bookings/conclude", actions.bookings.customerVendor.status);
router.patch(
  "/bookings/dispute",
  actions.bookings.disputeCustomerVendor.dispute
);

module.exports = { prefix: "booking", router };
