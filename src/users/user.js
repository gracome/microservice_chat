const { DataTypes } = require("sequelize")

module.exports = function(sequelize, Sequelize) {
    const User = sequelize.define('utilisateur', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
            notEmpty: true,
        },

        status: {
            type: DataTypes.BOOLEAN,
           
        },
    },
    )
    User.prototype.validPassword = function (password) {
        return this.password === password
    }

    return User
}