// Vendor Auth Routes

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
  );

// Vendor authenticated routes

router
  .patch(
    "/vendors/profile-photo",
    middlewares.upload_local.uploadSingle,
    actions.vendors.update.profilePhoto
  )
  .patch("/vendors", actions.vendors.update.profile)
  .patch(
    "/vendors/business-info",
    validators.vendors.businessInfoValidation,
    middlewares.validation.request,
    actions.vendors.info.businessInfo
  )
  .patch(
    "/vendors/address-info",
    validators.vendors.addressInfoValidation,
    middlewares.validation.request,
    actions.vendors.info.addressInfo
  );

module.exports = { prefix: "vendors", router };
