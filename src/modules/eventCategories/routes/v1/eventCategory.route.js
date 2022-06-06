router.post(
  "/categories/admins",
  middlewares.upload_local.uploadSingle,
  validators.eventCategories.addCategoryPayload,
  middlewares.validation.request,
  actions.eventCategories.add.category
);
router.post(
  "/subcategories/admins/:id",
  middlewares.upload_local.uploadSingle,
  middlewares.validation.request,
  actions.eventCategories.add.subcategory
);

router.get("/categories", actions.eventCategories.get.listCategories);
router.get("/sub-categories", actions.eventCategories.get.listSubCategories);
router.get("/categories/:id", actions.eventCategories.get.categoryById);
router.get("/sub-categories/:id", actions.eventCategories.get.subCategoryById);

router.patch(
  "/categories/:id",
  middlewares.upload_local.uploadSingle,
  actions.eventCategories.update.category
);
router.patch(
  "/categories/:id/add-update/sub-categories",
  actions.eventCategories.update.subCategoy
);
router.patch(
  "/sub-categories/:id",
  middlewares.upload_local.uploadSingle,
  actions.eventCategories.update.subCategoryImage
);
module.exports = { prefix: "categories", router };
