const { DataTypes } = require("sequelize")
const customer= require('../customer/customer')
const users= require('../users/user')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user_chanel', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      
      user_id: {
        type: DataTypes.INTEGER,
        FOREIGNKEY: (users.id),REFERENCES: users
      },
      customer_id: {
        type: DataTypes.INTEGER,
        FOREIGNKEY: (customer.id),REFERENCES: customer
      },
      
    })
  }

  