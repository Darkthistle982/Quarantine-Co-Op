// require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
//requiring passport as we've configure it.
const passport = require("./config/passport-setup");

//Setting up port
const PORT = process.env.PORT || 3000;
const db = require("./models");

//Creating express app and configuring middleware needed for authentiation
const app = express();
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
//We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

//We need this to hide our api key.
require("dotenv").config();

// set up view engine (I don't know what this does -MD)
app.set("view engine", "ejs");

// Requiring our routes
require("./routes/apiRoutes")(app);
require("./routes/auth-routes")(app);

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;

//Below is the original code
// // require("dotenv").config();
// const express = require("express");

// const PORT = process.env.PORT || 3000;
// const app = express();
// require("./config/passport-setup");
// require("dotenv").config();

// //If we are using sequelize we need line 11.
// const db = require("./models");
// const authRoutes = require("./routes/auth-routes");

// // Middleware
// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use("/auth", authRoutes);

// // set up view engine
// app.set("view engine", "ejs");

// // Routes
// require("./routes/apiRoutes")(app);

// var syncOptions = { force: false };

// // If running a test, set syncOptions.force to true
// // clearing the `testdb`
// if (process.env.NODE_ENV === "test") {
//   syncOptions.force = true;
// }

// // Starting the server, syncing our models ------------------------------------/
// db.sequelize.sync(syncOptions).then(function() {
//   app.listen(PORT, function() {
//     console.log(
//       "==> Listening on port %s. Visit http://localhost:%s/ in your browser.",
//       PORT,
//       PORT
//     );
//   });
// });

// module.exports = app;
