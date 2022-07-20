const { USER_ROLE } = constants;
router
  .post(
    "/admins/auth/login",
    validators.admins.signInPayloadValidation,
    middlewares.validation.request,
    middlewares.localPassport.authenticate,
    actions.admins.auth.signIn
  )
  .get(
    "/admins/stats",
    middlewares.verifyUserRole(USER_ROLE.ADMIN),
    actions.admins.get.stats
  );
router.post("/admins/seeder", actions.admins.auth.seeder);

module.exports = { prefix: "admins", router };
