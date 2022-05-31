router.post(
  "/bookings",
  validators.bookings.addBookingPayload,
  middlewares.validation.request,
  actions.bookings.create.booking
);
router.patch("/bookings", actions.bookings.customerVendor.status);
router.patch(
  "/bookingsdispute",
  actions.bookings.disputeCustomerVendor.dispute
);

module.exports = { prefix: "booking", router };
