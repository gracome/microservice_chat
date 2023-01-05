const { DataTypes } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('customer', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        unique:{
          msg: "Unique"
        }
      },
      social_id: {
        type: DataTypes.STRING,
        
      } 
      
    })
  }
  