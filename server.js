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
