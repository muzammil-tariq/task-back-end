exports.authenticate = async (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    function (err, user, info) {
      if (err || !user) {
        next(createError(401, info.message));
      } else {
        req.user = user;
        next();
      }
    }
  )(req, res, next);
};
