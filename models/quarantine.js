module.exports = function(sequelize, DataTypes) {
  let Books = sequelize.define("Books", {
    book_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    book_genre: DataTypes.STRING,
    checkOut: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
  return Books;
};
