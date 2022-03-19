router
  .post(
    "/vendors/auth/signUp",
    validators.vendors.signUpPayloadValidation,
    middlewares.validation.request,
    actions.vendors.auth.signUp
  )
  .post(
    "/vendors/auth/login",
    validators.vendors.signInPayloadValidation,
    middlewares.validation.request,
    middlewares.local_passport.authenticate,
    actions.vendors.auth.signIn
  )
  .post(
    "/vendors/auth/verifyEmail",
    validators.vendors.emailPayloadValidation,
    middlewares.validation.request,
    actions.vendors.auth.verifyEmail
  )

  .post(
    "/vendors/auth/verify-code/:id",
    middlewares.id_validation.validateId,
    validators.vendors.verifyCodePayloadValidation,
    middlewares.validation.request,
    actions.vendors.auth.verifyCode
  )
  .post(
    "/vendors/auth/resend-code/:id",
    validators.vendors.resendCodePayloadValidation,
    middlewares.validation.request,
    actions.vendors.auth.resendCode
  )
  .patch(
    "/vendors/auth/forgot-password",
    validators.vendors.emailPayloadValidation,
    middlewares.validation.request,
    actions.vendors.auth.forgotPassword
  )
  .patch(
    "/vendors/auth/reset-password/:id",
    middlewares.id_validation.validateId,
    validators.vendors.resetPasswordPayload,
    middlewares.validation.request,
    actions.vendors.auth.resetPassword
  )
  .get(
    "/vendors/auth/google",
    passport.authenticate("vendor-google", {
      scope: ["profile", "email"],
    })
  )
  .get(
    "/vendors/auth/facebook",
    passport.authorize("vendor-facebook", { scope: ["email"] })
  )
  .get(
    "/vendors/auth/google/callback",
    passport.authenticate("google", { session: false }),
    actions.vendors.auth.googleCb
  )
  .get(
    "/vendors/auth/facebook/callback",
    passport.authenticate("facebook", { session: false }),
    actions.vendors.auth.facebookCb
  );

module.exports = { prefix: "vendors", router };
