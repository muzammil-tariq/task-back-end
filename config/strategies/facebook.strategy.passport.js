const {
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  OWNER_FACEBOOK_CALLBACK,
  BASE_URL,
} = process.env;

const FacebookStrategy = require("passport-facebook").Strategy;
module.exports = function (passportName, role) {
  const callbackURL =
    role == "owners" ? BASE_URL + OWNER_FACEBOOK_CALLBACK : undefined;

  passport.use(
    passportName,
    new FacebookStrategy(
      {
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        callbackURL,
        profileFields: [
          "id",
          "email",
          "gender",
          "link",
          "locale",
          "name",
          "timezone",
          "updated_time",
          "verified",
          "picture.type(large)",
        ],
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const model = req.roleModel ? req.roleModel : req.roleModel;

          var user = await model.findOne({
            uId: profile.id,
          });
          if (!user) {
            user = await model.create({
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              uId: profile.id,
              provider: profile.provider,
              accessToken: accessToken,
              email: profile.emails[0].value,
              profilePhoto: profile.photos ? profile.photos[0].value : "",
            });
          }
          return done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
};
