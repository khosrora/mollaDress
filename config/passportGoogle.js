const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../src/components/user/model/User');

// * helper
const nanoId = require('../src/helper/nanoId');


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});



passport.use(new googleStrategy({
  clientID: process.env.GOOGLE_CLIENT_KEY,
  clientSecret: process.env.GOOGLE_SECRET_KEY,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, (token, refreshToken, profile, done) => {
  User.findOne({ email: profile.emails[0].value }, async (err, user) => {
    if (err) return done(err);
    if (user) return done(null, user);
    const newUser = await User.create({
      fullname: profile.displayName,
      email: profile.emails[0].value,
      password: profile.id,
      mobileActiveCode: nanoId(4)
    })

    newUser.save(err => {
      if (err) throw err;
      done(null, newUser);
    })

  })
}));