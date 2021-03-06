const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: `${process.env.CLIENT_ID}`,
    clientSecret: `${process.env.CLIENT_SECRET}`,
    callbackURL: "http://localhost:3000/api/astronomy/google/callBack" || `http://localhost:3001/google/callBack`,
    proxy: true 
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser(function (user, done) {
    done(null,user)
})
passport.deserializeUser(function (user, done) {
    done(null,user)
})