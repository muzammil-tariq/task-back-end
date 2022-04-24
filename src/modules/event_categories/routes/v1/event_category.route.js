router.post(
  "/categories/admins",
  middlewares.upload_local.uploadSingle,
  validators.event_categories.addCategoryPayload,
  middlewares.validation.request,
  actions.event_categories.add.category
);

router.get("/categories", actions.event_categories.get.listCategories);
router.get("/sub-categories", actions.event_categories.get.listSubCategories);
router.get("/categories/:id", actions.event_categories.get.categoryById);
router.get("/sub-categories/:id", actions.event_categories.get.subCategoryById);
router.patch(
  "/categories/:id",
  middlewares.upload_local.uploadSingle,
  actions.event_categories.update.category
);
router.patch(
  "/categories/:id/add-update/sub-categories",
  actions.event_categories.update.subCategoy
);

module.exports = { prefix: "categories", router };
