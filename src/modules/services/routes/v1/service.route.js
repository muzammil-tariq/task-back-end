const { USER_ROLE } = constants;

router.post(
  "/services",
  middlewares.verifyUserRole(USER_ROLE.ADMIN),
  validators.services.addServicePayload,
  middlewares.validation.request,
  actions.services.add.service
);
router.get(
  "/services",
  validators.common.getList,
  actions.services.get.listServices
);
router.get("/services/:id", actions.services.get.serviceById);
router.get(
  "/services/:id/vendors",
  validators.services.getList,
  middlewares.validation.request,
  actions.services.get.vendorsByServices
);
router.get(
  "/services/:id/vendors/favourited",
  validators.services.getList,
  middlewares.validation.request,
  actions.services.get.favouritedVendorsByServices
);

router.patch(
  "/services/:id",
  middlewares.verifyUserRole(USER_ROLE.ADMIN),
  validators.services.updateServicePayload,
  middlewares.validation.request,
  actions.services.update.service
);
module.exports = { prefix: "services", router };
