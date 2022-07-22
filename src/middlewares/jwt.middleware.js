const { USER_ROLE } = constants;
const roleModel = {
  customers: models[USER_ROLE.CUSTOMER],
  vendors: models[USER_ROLE.VENDOR],
  admins: models[USER_ROLE.ADMIN],
};
router.use(function jwtMiddleware(req, res, next) {
  let isChecked = 0;
  for (let route in roleModel) {
    if (req.path.search(`/${route}`) != -1 && !isChecked) {
      req.roleModel = roleModel[route];
      isChecked = 1;
    }
  }
  passport.authenticate("jwt", { session: false }, function (err, user, info) {
    if (err || !user) {
      if (
        utils.isPublicRequest({
          method: req.method,
          path: req.path,
        })
      ) {
        next();
      } else {
        let errMsg = info ? info.message : err.message;
        if (errMsg.toLowerCase() == "jwt expired".toLowerCase()) {
          errMsg = messages.sessionExpiry;
        }
        next(createError(401, errMsg));
      }
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
});
