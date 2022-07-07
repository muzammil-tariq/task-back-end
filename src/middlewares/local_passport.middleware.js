exports.authenticate = async (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    function (err, user, info) {
      req.user = user;
      if (err || !user) {
        next(createError(401, info.message));
      } else {
        // Vendor account status checks
        if (user.collection.modelName === USER_ROLE.VENDOR) {
          if (user.status === models.Vendors.status.APPROVED) {
            next();
          } else if (user.status === models.Vendors.status.PENDING) {
            next(createError(401, messages.vendorRequestPending));
          } else if (user.status === models.Vendors.status.REJECTED) {
            next(createError(401, messages.vendorRequestRejected));
          } else if (user.status === models.Vendors.status.SUSPENDED) {
            next(createError(401, messages.vendorRequestSuspended));
          }
        } else {
          next();
        }
      }
    }
  )(req, res, next);
};
