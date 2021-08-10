const roleModel = {
  users: models.Users,
};
router.use(function (req, res, next) {
  let isChecked = 0;
  for (let route in roleModel) {
    if (req.path.search(`${route}/`) != -1 && !isChecked) {
      req.roleModel = roleModel[route];
      isChecked = 1;
    }
  }
  if (req.path.search("/login") > -1) {
    next();
  } else {
    if (req.path.search("auth/") > -1) {
      next();
      return;
    }
    passport.authenticate(
      "jwt",
      { session: false },
      function (err, user, info) {
        if (err || !user) {
          let errMsg = info ? info.message : err.message;
          if (errMsg.toLowerCase() == "jwt expired".toLowerCase()) {
            errMsg = messages.sessionExpiry;
          }
          next(createError(401, errMsg));
        } else {
          req.user = user;
          next();
        }
      }
    )(req, res, next);
  }
});
