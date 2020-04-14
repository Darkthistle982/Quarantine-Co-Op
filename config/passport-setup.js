//we import passport packages required for authentication
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// Only creating a local strategy now, below would include google if we want to.
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
require("dotenv").config();

// We will need the models folder to check passport against
const db = require("../models");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: "http://www.example.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function(err, user) {
        return done(err, user);
      });
    }
  )
);
// Telling passport we want to use a Local STrategy. In other words, we want to login with a username/email and password
passport.use(
  new LocalStrategy(
    //Our user will sign in using an email, rather than a "username"
    {
      usernameField: "email"
    },
    function(email, password, done) {
      // When a user tries to sign in this code runs
      db.User.findOne({
        where: {
          email: email
        }
      }).then(function(dbUser) {
        // If there's no user with the given email
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect email."
          });
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        // If none of the above, return the user
        return done(null, dbUser);
      });
    }
  )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, callback) {
  callback(null, user);
});

passport.deserializeUser(function(object, callback) {
  callback(null, object);
});

module.exports = passport;
