const chanels = require("../chanels/channel")
const customer = require("../customer/customer")
const user = require("../users/user")

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('conversations', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      agent_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        FOREIGNKEY: (user.id),REFERENCES: user 
      },
      channel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        FOREIGNKEY: (chanels.id),REFERENCES: chanels 
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        FOREIGNKEY: (customer.id),REFERENCES: customer
      },
      created_date: {
        type: DataTypes.DATE
      },
      opened_date: {
        type: DataTypes.DATE
      },
      closed_date: {
        type: DataTypes.DATE
      },
      
    })
  }
  