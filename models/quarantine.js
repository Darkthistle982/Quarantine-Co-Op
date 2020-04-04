module.exports = function(sequelize, DataTypes) {
  let Media = sequelize.define("Media", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author_creator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.STRING,
    },
    media_type: {
      type: DataTypes.STRING,
    },
    checkedOut: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
  return Media;
};
