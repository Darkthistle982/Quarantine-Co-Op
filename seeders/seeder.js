//seeder files used to help seed initial db from sequelize cli
"use strict";
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Media",
      [
        {
          title: "A book",
          authorCreator: "A Writer",
          genre: "Horror",
          rating: "Mature",
          mediaType: "Scary Book",
          checkedOut: false,
          checkedOutBy: "A User",
          returnByDate: "a Date",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },
  down: function(queryInterface, Sequelize) {
    return Promise.resolve(true);
  }
};
