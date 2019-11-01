const passport = require('passport');
const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { Puppy } = require('../db/models');
module.exports = router;

// collect our google configuration into an object
const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
};
// configure the strategy with our config object, and write the function that passport will invoke after google sends
// us the user's profile and access token
const strategy = new GoogleStrategy(googleConfig, function(
  token,
  refreshToken,
  profile,
  done
) {
  const googleId = profile.id;
  const name = profile.displayName;
  const email = profile.emails[0].value;

  Puppy.findOne({ where: { googleId: googleId } })
    .then(function(puppy) {
      if (!puppy) {
        return Puppy.create({ name, email, googleId }).then(function(puppy) {
          done(null, puppy);
        });
      } else {
        done(null, puppy);
      }
    })
    .catch(done);
});

// register our strategy with passport
passport.use(strategy);

//when someone clicks 'log in with google', it makes this get request our server. This will redirect to the Provider (Google)
router.get('/auth/google', passport.authenticate('google', { scope: 'email' }));

//Once our user "signs the contract" with Google, google will make a request to the callback that we've configured with them
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);
