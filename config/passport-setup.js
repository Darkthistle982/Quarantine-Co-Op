//we import passport packages required for authentication
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// Only creating a local strategy now, below would include google if we want to.
// const GoogleStrategy = require("passport-google-oauth20");
require("dotenv").config();

// We will need the models folder to check passport against
const db = require("../models");

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

passport.deserializeUser(function(obj, callback) {
  callback(null, obj);
});

module.exports = passport;




//Below is the original code Swazey wrote
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20");
// require("dotenv").config();

// passport.use(
//   new GoogleStrategy(
//     {
//       // options for google strategy
//       clientID: process.env.clientID,
//       clientSecret: process.env.clientSecret,
//       callbackURL: "/auth/google/redirect"
//     },
//     (accessToken, refreshToken, profile) => {
//       // passport callback function
//       console.log("passport callback function fired:");
//       console.log(profile);
//       new User({
//         googleId: profile.id,
//         username: profile.displayName
//       })
//         .save()
//         .then(newUser => {
//           console.log("new user created: ", newUser);
//         });
//     }
//   )
// );
