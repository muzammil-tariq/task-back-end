const { USER_ROLE } = constants;
router
  .get("/settings", actions.settings.get)
  .patch(
    "/settings",
    middlewares.verifyUserRole(USER_ROLE.ADMIN),
    validators.settings.update,
    middlewares.validation.request,
    actions.settings.update
  );

module.exports = { prefix: "settings", router };
