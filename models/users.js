module.exports = function(sequelize, DataTypes) {
  let Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },

    googleId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Users;
};
