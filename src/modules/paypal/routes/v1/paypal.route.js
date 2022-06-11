const { USER_ROLE } = constants;

router
  .get(
    "/paypal/onboard",
    middlewares.verifyUserRole(USER_ROLE.VENDOR),
    actions.paypal.get.generateSignUpLink
  )
  .get(
    "/paypal/onboard/status",
    middlewares.verifyUserRole(USER_ROLE.VENDOR),
    actions.paypal.get.onboardingStatus
  )
  .get(
    "/paypal/order/:orderId",
    middlewares.verifyUserRole(USER_ROLE.VENDOR),
    actions.paypal.get.orderDetails
  )
  .post("/paypal/webhook", actions.paypal.webhook);

module.exports = { prefix: "paypal", router };
