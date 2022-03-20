router
  .post(
    "/users/auth/signUp",
    validators.users.signUpPayloadValidation,
    middlewares.validation.request,
    actions.users.auth.signUp
  )
  .post(
    "/users/auth/login",
    validators.users.signInPayloadValidation,
    middlewares.validation.request,
    middlewares.local_passport.authenticate,
    actions.users.auth.signIn
  )
  .post(
    "/users/auth/verifyEmail",
    validators.users.emailPayloadValidation,
    middlewares.validation.request,
    actions.users.auth.verifyEmail
  )

  .post(
    "/users/auth/verify-code/:id",
    middlewares.id_validation.validateId,
    validators.users.verifyCodePayloadValidation,
    middlewares.validation.request,
    actions.users.auth.verifyCode
  )
  .post(
    "/users/auth/resend-code/:id",
    validators.users.resendCodePayloadValidation,
    middlewares.validation.request,
    actions.users.auth.resendCode
  )
  .patch(
    "/users/auth/forgot-password",
    validators.users.emailPayloadValidation,
    middlewares.validation.request,
    actions.users.auth.forgotPassword
  )
  .patch(
    "/users/auth/reset-password/:id",
    middlewares.id_validation.validateId,
    validators.users.resetPasswordPayload,
    middlewares.validation.request,
    actions.users.auth.resetPassword
  )
  .get(
    "/users/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  )
  .get(
    "/users/auth/facebook",
    passport.authorize("facebook", { scope: ["email"] })
  )
  .get(
    "/users/auth/google/callback",
    passport.authenticate("google", { session: false }),
    actions.users.auth.googleCb
  )
  .get(
    "/users/auth/facebook/callback",
    passport.authenticate("facebook", { session: false }),
    actions.users.auth.facebookCb
  );

module.exports = { prefix: "users", router };
