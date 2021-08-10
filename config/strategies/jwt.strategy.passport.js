const { Strategy: JwtStrategy, ExtractJwt } = passportJWT;
const { JWTSECRET } = process.env;
const roleModel = {
  users: models.Users,
};
ExtractJwt.fromBodyField("token");
const opts = { passReqToCallback: true, secretOrKey: JWTSECRET };

module.exports = function () {
  opts.jwtFromRequest = function (request) {
    var token = null;
    if (request.header("authorization")) {
      token = request.header("authorization").trim().split(" ").pop();
    } else if (request.query.jwtToken) {
      token = request.query.jwtToken;
    }
    request.jwtToken = token;
    return token;
  };

  passport.use(
    new JwtStrategy(opts, async (req, jwt_payload, done) => {
      try {
        if (!jwt_payload.id) {
          process.nextTick(function () {
            done({ status: 401, message: messages.InvalidToken }, null);
          });
        } else {
          let customError = {
            message: "Invalid Token",
            status: 401,
          };

          let model = req.roleModel;
          if (jwt_payload.model && !model) {
            model = roleModel[jwt_payload.model];
          }
          let user = await model.findById(jwt_payload.id);
          user ? done(null, user) : done(customError, false);
        }
      } catch (error) {
        done(error, false);
      }
    })
  );
};
