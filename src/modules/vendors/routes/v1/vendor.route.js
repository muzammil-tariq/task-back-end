const { USER_ROLE } = constants;

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
    "/vendors/auth/reset-password",
    validators.vendors.resetPasswordPayload,
    middlewares.validation.request,
    actions.vendors.auth.resetPassword
  );
// Vendor public routes
router.get("/vendors/featured/public", actions.vendors.featured.getList);
// Vendor authenticated routes
router
  .patch(
    "/vendors",
    middlewares.verifyUserRole(USER_ROLE.VENDOR),
    validators.vendors.update,
    middlewares.validation.request,
    actions.vendors.update.profile
  )
  .patch(
    "/vendors/business-info",
    middlewares.verifyUserRole(USER_ROLE.VENDOR),
    validators.vendors.businessInfoValidation,
    middlewares.validation.request,
    actions.vendors.info.businessInfo
  )
  .patch(
    "/vendors/address-info",
    middlewares.verifyUserRole(USER_ROLE.VENDOR),
    validators.vendors.addressInfoValidation,
    middlewares.validation.request,
    actions.vendors.info.addressInfo
  )
  .patch(
    "/vendors/skills",
    middlewares.verifyUserRole(USER_ROLE.VENDOR),
    actions.vendors.skill.updateSkill
  )
  .patch(
    "/vendors/featured/:id",
    middlewares.verifyUserRole(USER_ROLE.ADMIN),
    validators.vendors.featurePayloadValidation,
    middlewares.validation.request,
    actions.vendors.featured.update
  )
  .get(
    "/vendors/stats",
    middlewares.verifyUserRole(USER_ROLE.VENDOR),
    actions.vendors.get.stats
  )
  .get(
    "/vendors/stats/:id?",
    middlewares.verifyUserRole(USER_ROLE.ADMIN),
    actions.vendors.get.stats
  )
  .get(
    "/vendors/favourited",
    middlewares.verifyUserRole(USER_ROLE.CUSTOMER),
    validators.common.getList,
    middlewares.validation.request,
    actions.vendors.favourited.getList
  )
  .patch(
    "/vendors/favourited/add",
    middlewares.verifyUserRole(USER_ROLE.CUSTOMER),
    validators.vendors.favourited,
    middlewares.validation.request,
    actions.vendors.favourited.add
  )
  .patch(
    "/vendors/favourited/remove",
    middlewares.verifyUserRole(USER_ROLE.CUSTOMER),
    validators.vendors.favourited,
    middlewares.validation.request,
    actions.vendors.favourited.remove
  )
  .get(
    "/vendors/:id",
    validators.common.getById,
    middlewares.validation.request,
    actions.vendors.get.byId
  )
  .get(
    "/vendors/:id/reviews",
    validators.common.getList,
    validators.common.getById,
    middlewares.validation.request,
    actions.vendors.get.reviews
  )
  .get(
    "/vendors",
    middlewares.verifyUserRole(USER_ROLE.ADMIN),
    validators.common.getList,
    middlewares.validation.request,
    actions.vendors.get.list
  );

module.exports = { prefix: "vendors", router };
