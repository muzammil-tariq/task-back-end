router.post(
  "/admins/auth/login",
  validators.admins.signInPayloadValidation,
  middlewares.validation.request,
  middlewares.local_passport.authenticate,
  actions.admins.auth.signIn
);
router.post("/admins/seeder", actions.admins.auth.seeder);

module.exports = { prefix: "admins", router };
