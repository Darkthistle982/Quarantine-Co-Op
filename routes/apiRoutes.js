// Requiring path so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

const db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/findAll", function(request, response) {
    db.Media.findAll({}).then(function(result) {
      return response.json(result);
    });
  });

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/main");
    }
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/signup", function(request, response) {
    // If the user already has an account send them to the members page
    if (request.user) {
      response.redirect("/main");
    }
    response.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // Here we'll add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/main", isAuthenticated, function(request, response) {
    response.sendFile(path.join(__dirname, "../public/main.html"));
  });
  //api route for the check out button so users can check out items in stock
  app.put("/api/checkout/:id", function(request, response) {
    db.Media.update(
      {
        checkedOut: true
      },
      {
        where: {
          id: request.params.id
        }
      }
    ).then(function(dbCheckedout) {
      response.json(dbCheckedout);
    });
  });
  //api route so users who are finished with items can return items to the stock
  app.put("/api/return/:id", function(request, response) {
    db.Media.update(
      {
        checkedOut: false
      },
      {
        where: {
          id: request.params.id
        }
      }
    ).then(function(dbCheckedIn) {
      response.json(dbCheckedIn);
    });
  });
  //post route to create new items to add to the database for borrowing
  app.post("/api/addNew", function(request, response) {
    db.Media.create({
      title: request.body.title,
      authorCreator: request.body.authorCreator,
      genre: request.body.genre,
      rating: request.body.rating,
      mediaType: request.body.mediaType
    }).then(function() {
      response.status(201).end();
    });
  });
};
