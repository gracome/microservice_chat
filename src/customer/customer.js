const { DataTypes } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('customer', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique:{
          msg: "Unique"
        }
      }
      
      
    })
  }
  