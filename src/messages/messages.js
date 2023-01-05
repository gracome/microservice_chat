const { DataTypes } = require("sequelize")

const conversations = require('../chats/chat')
const users= require('../users/user')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('messages', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      sender_id: {
        type: DataTypes.UUID,
      },
      chat_id: {
        type: DataTypes.UUID,
        FOREIGNKEY: (conversations.id),REFERENCES: conversations
      },
      message: {
        type: DataTypes.TEXT,
      },
     
      user_id: {
        type: DataTypes.UUID,
        FOREIGNKEY: (users.id),REFERENCES: users
      },
      is_readed: {
        type: DataTypes.BOOLEAN,
      }
     
    })
  }

  