"use strict";
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  BASE_URL,
  OWNER_GOOGLE_CALLBACK,
} = process.env;

var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

module.exports = function (passportName, role) {
  const callbackURL =
    role == "owners" ? BASE_URL + OWNER_GOOGLE_CALLBACK : undefined;
  passport.use(
    passportName,
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL,
        passReqToCallback: true,
      },
      async (req, token, tokenSecret, profile, done) => {
        try {
          const model = req.roleModel;
          var user = await model.findOne({
            email: profile.emails[0].value,
          });
          if (!user) {
            const firstName = profile.displayName
              .split(" ")
              .slice(0, -1)
              .join(" ");
            const lastName = profile.displayName.split(" ").slice(-1).join(" ");
            var user = await model.create({
              email: profile.emails[0].value,
              firstName: firstName,
              lastName: lastName,
              uId: profile.id,
              provider: profile.provider,
              accessToken: token,
              profilePhoto: profile.photos ? profile.photos[0].value : "",
            });
          }
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
