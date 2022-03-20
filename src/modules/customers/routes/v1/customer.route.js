router
  .post(
    "/customers/auth/signUp",
    validators.customers.signUpPayloadValidation,
    middlewares.validation.request,
    actions.customers.auth.signUp
  )
  .post(
    "/customers/auth/login",
    validators.customers.signInPayloadValidation,
    middlewares.validation.request,
    middlewares.local_passport.authenticate,
    actions.customers.auth.signIn
  )
  .post(
    "/customers/auth/verifyEmail",
    validators.customers.emailPayloadValidation,
    middlewares.validation.request,
    actions.customers.auth.verifyEmail
  )

  .post(
    "/customers/auth/verify-code/:id",
    middlewares.id_validation.validateId,
    validators.customers.verifyCodePayloadValidation,
    middlewares.validation.request,
    actions.customers.auth.verifyCode
  )
  .post(
    "/customers/auth/resend-code/:id",
    validators.customers.resendCodePayloadValidation,
    middlewares.validation.request,
    actions.customers.auth.resendCode
  )
  .patch(
    "/customers/auth/forgot-password",
    validators.customers.emailPayloadValidation,
    middlewares.validation.request,
    actions.customers.auth.forgotPassword
  )
  .patch(
    "/customers/auth/reset-password/:id",
    middlewares.id_validation.validateId,
    validators.customers.resetPasswordPayload,
    middlewares.validation.request,
    actions.customers.auth.resetPassword
  )
  .get(
    "/customers/auth/google",
    passport.authenticate("customer-google", {
      scope: ["profile", "email"],
    })
  )
  .get(
    "/customers/auth/facebook",
    passport.authorize("customer-facebook", { scope: ["email"] })
  )
  .get(
    "/customers/auth/google/callback",
    passport.authenticate("customer-google", { session: false }),
    actions.customers.auth.googleCb
  )
  .get(
    "/customers/auth/facebook/callback",
    passport.authenticate("customer-facebook", { session: false }),
    actions.customers.auth.facebookCb
  );

module.exports = { prefix: "customers", router };
