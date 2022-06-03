router.get("/services/public", actions.publicServices.get.getList);
router.get("/services/public/:id", actions.publicServices.get.getById);
module.exports = { prefix: "services", router };
