module.exports = function(sequelize, DataTypes) {
  let Media = sequelize.define("Media", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    authorCreator: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.STRING
    },
    mediaType: {
      type: DataTypes.STRING
    },
    checkedOut: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    checkedOutBy: {
      type: DataTypes.STRING
    },
    returnByDate: {
      type: DataTypes.STRING
    }
  });
  return Media;
};
