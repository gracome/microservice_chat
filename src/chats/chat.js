const chanels = require("../chanels/channel")
const customer = require("../customer/customer")
const user = require("../users/user")

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('conversations', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      agent_id: {
        type: DataTypes.UUID,
        allowNull: false,
        FOREIGNKEY: (user.id),REFERENCES: user 
      },
      channel_id: {
        type: DataTypes.UUID,
        allowNull: false,
        FOREIGNKEY: (chanels.id),REFERENCES: chanels 
      },
      customer_id: {
        type: DataTypes.UUID,
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
  