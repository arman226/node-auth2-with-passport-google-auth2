const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;

const clientID = `343335638144-fb42v0raraboeqi57sv4n3pl01td6rd9.apps.googleusercontent.com`;
const clientSecret = "3Ua22O65XHjdawH_Vsrz6Q9P";

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: "http://localhost:3000/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log("logging", profile);
      //here is wher we check as to whether or not a user exists
      return done(null, profile);
    }
  )
);

//for user serialization
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
