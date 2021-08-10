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
        try {
          let user = await models.Users.findOne({
            email: email,
          });
          if (!user || !user.verifyPassword(password)) {
            return done(null, false, { message: messages.invalidLogin });
          }
          // if (!user.isVerified) {
          //   return done(null, false, { message: messages.notVerified });
          // }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
