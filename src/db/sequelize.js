const { Sequelize } = require('sequelize');
const chat = require('../chats/chat')
const message= require('../messages/messages')
const customer= require('../customer/customer')
const chanel= require('../chanels/channel')
const users= require('../users/user')
const { DataTypes } = require("sequelize")
const bcrypt = require('bcrypt')
const assignation = require('../chats/assigned')
const user_chanel= require('../userChanels/userChanel')


const sequelize = new Sequelize('users', 'postgres', 'omega', {
    host: 'localhost',
    dialect: 'postgres'
  });


  sequelize.authenticate()
  .then(_=> console.log('La connexion a été établi'))
  .catch(error =>console.error(`impossible de se connecter a la base de donnée ${error}`))


  const chanels =  chanel(sequelize, DataTypes)
  const chats =  chat(sequelize, DataTypes)
  const messages =  message(sequelize, DataTypes)
  const customers =  customer(sequelize, DataTypes)
  const user = users(sequelize, DataTypes)
  const assigned= assignation(sequelize, DataTypes)
  const userChanel= user_chanel(sequelize, DataTypes)
  // sequelize.sync( {force: true})
  // .then(_=>{  
  //     console.log('la connexion de la base de donnée a bien été synchronisé')
  // }),


  
 
  
  module.exports =sequelize