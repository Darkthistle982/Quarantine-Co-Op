// require("dotenv").config();
const express = require("express");

// We are not using handlebars so we shouldn't need line 5.
// var exphbs = require("express-handlebars");

const PORT = process.env.PORT || 3000;
const app = express();
const passportSetup = require("./config/passport-setup");
const keys = require("./config/keys");

//If we are using sequelize we need line 11.
const db = require("./models");
const authRoutes = require("./routes/auth-routes");

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/auth", authRoutes);

// set up view engine
app.set("view engine", "ejs");

//We are not using handlebars so we should not need lines 20-26
// Handlebars
// app.engine(
//   "handlebars",
//   exphbs({
//     defaultLayout: "main"
//   })
// );
// app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
