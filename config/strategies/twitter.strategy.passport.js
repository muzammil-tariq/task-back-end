"use strict";
const {
  TWITTER_CLIENT_ID,
  TWITTER_CLIENT_SECRET,
  BASE_URL,
  OWNER_TWITTER_CALLBACK,
} = process.env;

var TwitterStrategy = require("passport-twitter").Strategy;

module.exports = function (passportName, role) {
  const callbackURL =
    role == "owners" ? BASE_URL + OWNER_TWITTER_CALLBACK : undefined;
  passport.use(
    passportName,
    new TwitterStrategy(
      {
        consumerKey: TWITTER_CLIENT_ID,
        consumerSecret: TWITTER_CLIENT_SECRET,
        callbackURL,
        passReqToCallback: true,
      },
      async (req, token, tokenSecret, profile, done) => {
        try {
          const model = req.roleModel;
          var user = await model.findOne({
            uId: profile.id,
          });
          if (!user) {
            const firstName = profile.displayName;
            var user = await model.create({
              firstName: firstName,
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
