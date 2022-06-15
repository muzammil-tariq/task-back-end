const { USER_ROLE } = constants;

router.post(
  "/categories",
  middlewares.verifyUserRole(USER_ROLE.ADMIN),
  validators.eventCategories.addCategoryPayload,
  middlewares.validation.request,
  actions.eventCategories.add.category
);
router.post(
  "/subCategories/:id",
  middlewares.verifyUserRole(USER_ROLE.ADMIN),
  validators.eventCategories.addSubCategoryPayload,
  middlewares.validation.request,
  actions.eventCategories.add.subcategory
);

router.get("/categories", actions.eventCategories.get.listCategories);
router.get("/subCategories", actions.eventCategories.get.listSubCategories);
router.get("/categories/:id", actions.eventCategories.get.categoryById);
router.get("/subCategories/:id", actions.eventCategories.get.subCategoryById);
router.get(
  "/subCategories/:id/vendors",
  validators.eventCategories.getList,
  middlewares.validation.request,
  actions.eventCategories.get.vendorsBySubCategories
);

router.patch(
  "/categories/:id",
  middlewares.verifyUserRole(USER_ROLE.ADMIN),
  validators.eventCategories.updateCategoryPayload,
  middlewares.validation.request,
  actions.eventCategories.update.category
);
router.patch(
  "/subCategories/:id",
  middlewares.verifyUserRole(USER_ROLE.ADMIN),
  validators.eventCategories.updateSubCategoryPayload,
  middlewares.validation.request,
  actions.eventCategories.update.subCategory
);
module.exports = { prefix: "categories", router };
