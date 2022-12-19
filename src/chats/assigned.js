const { DataTypes } = require("sequelize")

const conversations = require('./chat')
const users= require('../users/user')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('assignation', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      chat_id: {
        type: DataTypes.STRING,
        FOREIGNKEY: (conversations.id),REFERENCES: conversations

      },
     
      user_id: {
        type: DataTypes.INTEGER,
        FOREIGNKEY: (users.id),REFERENCES: users
      },
      agent_Response_date: {
        type: DataTypes.DATE,
      },
      end_date: {
        type: DataTypes.DATE,
      }
      
    })
  }

  