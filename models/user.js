module.export = function(sequelize, Sequelize) {
    var User = sequelize.define("user", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return User;
}