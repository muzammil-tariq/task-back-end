router.get("/user", actions.private.getUserProfile);

module.exports = { prefix: "private", router };
