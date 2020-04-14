// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport-setup");
//
module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(
    request,
    response
  ) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    response.json("/main");
  });
  //
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(request, response) {
    db.User.create({
      name: request.body.name,
      email: request.body.email,
      password: request.body.password
    })
      .then(function() {
        response.send("/");
      })
      .catch(function(error) {
        console.log(error);
        response.json(error);
        response.status(422).json(error.errors[0].message);
      });
  });

  // Route for logging user out
  app.get("/logout", function(request, response) {
    request.logout();
    response.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(request, response) {
    if (!request.user) {
      // The user is not logged in, send back an empty object
      response.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      response.json({
        name: request.user.name,
        email: request.user.email,
        id: request.user.id
      });
    }
  });
};
