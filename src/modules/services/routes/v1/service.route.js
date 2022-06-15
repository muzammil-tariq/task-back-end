const { USER_ROLE } = constants;

router.post(
  "/services",
  middlewares.verifyUserRole(USER_ROLE.ADMIN),
  validators.services.addServicePayload,
  middlewares.validation.request,
  actions.services.add.service
);
router.post(
  "/subServices/:id",
  middlewares.verifyUserRole(USER_ROLE.ADMIN),
  validators.services.addSubServicePayload,
  middlewares.validation.request,
  actions.services.add.subService
);

router.get("/services", actions.services.get.listCategories);
router.get("/subServices", actions.services.get.listSubCategories);
router.get("/services/:id", actions.services.get.serviceById);
router.get("/subServices/:id", actions.services.get.subServiceById);
router.get(
  "/subServices/:id/vendors",
  validators.services.getList,
  middlewares.validation.request,
  actions.services.get.vendorsBySubCategories
);

router.patch(
  "/services/:id",
  middlewares.verifyUserRole(USER_ROLE.ADMIN),
  validators.services.updateServicePayload,
  middlewares.validation.request,
  actions.services.update.service
);
router.patch(
  "/subServices/:id",
  middlewares.verifyUserRole(USER_ROLE.ADMIN),
  validators.services.updateSubServicePayload,
  middlewares.validation.request,
  actions.services.update.subService
);
module.exports = { prefix: "categories", router };
