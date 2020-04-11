// Requiring path so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

const db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/findAll", function(request, response) {
    db.Media.findAll({}).then(function(result) {
      console.log(result);
      response.json(result);
    });
  });

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/main");
    }
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/main");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // Here we'll add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/main", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"));
  });
};

<<<<<<< HEAD

app.post("/api/addNew", function(request, response) {
    return response.json();
});
=======
// app.post("/api/addNew", function(request))
>>>>>>> 4ac75ce437a45766117b8eaf9cc0c9d8dc7f4e1d
