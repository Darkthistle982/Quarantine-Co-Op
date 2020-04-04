const db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function() {
    db.Media.findAll({}).then(function(result) {
      result.sendFile(path.join(__dirname, "../public/index.html"));
    });
  });
};
