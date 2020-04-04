const db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(request, response) {
    db.Media.findAll({}).then(function(result) {
      result.sendFile(path.join(__dirname, "../public/index.html"));
    });
  });

  // Create a new example
  app.post("/api/examples", function(request, response) {
    
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(request, response) {
    
  });
};