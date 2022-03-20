"use strict";

const { Strategy: LocalStrategy } = passportLocal;
module.exports = function () {
  // Use local strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        let model = req.roleModel;
        try {
          let user = await model.findOne({
            email: email,
          });
          if (!user || !user.verifyPassword(password)) {
            return done(null, false, { message: messages.invalidLogin });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
