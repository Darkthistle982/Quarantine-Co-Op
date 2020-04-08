const db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/", function() {
    db.Media.findAll({}).then(function(result) {
      console.log(result);
      result.sendFile(path.join(__dirname, "../public/index.html"));
    });
  });
};
