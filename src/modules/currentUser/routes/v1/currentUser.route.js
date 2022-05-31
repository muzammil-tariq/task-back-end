router.get("/user", actions.currentUser.check.user);

module.exports = { prefix: "fetch", router };
