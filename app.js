const express = require('express');
const app = express();
const port = 5000;
const sequelise= require('sequelize')
const sequelize= require('./src/db/sequelize')
const _ = require("lodash");
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require("passport");
const dotenv = require('dotenv');
const cors = require('cors');
var http = require('http').Server(app);
var io = require('socket.io')(http);
const customer= require('./src/customer/customer-models');
const chats= require('./src/chats/chat.model')
const chanel= require('./src/chanels/channel.models')
const messages= require('./src/messages/messages_models');

app.use(express.json());
app.use(cors({origin: '*'}))


require("./config/passport");


const NRP = require("node-redis-pubsub");
const  assignation  = require('./src/chats/chat.model');

var config = {
    url: "rediss://red-cei3ofsgqg4e0eftlhug:Gd9PfQ8IC8YYEKC710pjVYpxTq0wejoV@oregon-redis.render.com:6379"
};

var nrp = new NRP(config);



nrp.on("NEW_MESSAGE", async (data)=> {
  const customerExists = await customer.exists(data.send_id);

  if (!customerExists) {
    // Crée le client s'il n'existe pas déjà
    const customerData = {
      username: data.profile.first_name + ' ' + data.profile.last_name,
      social_id: data.send_id
    };
    const newCustomer = await customer.create(customerData);

    // Assignation de l'agent
    const agentId = await assignation.assign();

    // Crée la conversation
    const chatData = {
      agent_id: agentId,
      channel_id: "73564b12-a136-4695-8adc-a3952b8f8bad",
      customer_id: newCustomer,
    };
    const newChat = await chats.create(chatData);

    // Crée le message
    const messageData = {
      sender_id: newCustomer,
      chat_id: newChat,
      message: data.msg,
      user_id: agentId,
      is_readed: "false"
    };
    const newMessage = await messages.create(messageData);
  }else{
  const cus= await messages.cus(data.send_id);

  // Récupère l'identifiant de la conversation ouverte pour le client, s'il y en a une
const openedChatId = await chats.isChatOpened(cus);
// Si une conversation est ouverte
if (openedChatId !== null) {
  // Récupère l'identifiant de l'agent assigné
  const agent_id = await assignation.assign();
  // Crée un nouveau message
  const message_data = {
    sender_id: cus,
    chat_id: openedChatId, // Utilise l'identifiant de la conversation ouverte
    message: data.msg,
    user_id: agent_id
    
  };
  console.log("jj", message_data.user_id);
  // Ajoute le nouveau message à la conversation
  const addMessage = await messages.create(message_data);
 
}
// Si aucune conversation n'est ouverte
else {
  // Récupère l'identifiant de l'agent assigné
  const agent_id = await assignation.assign();
  // Crée une nouvelle conversation
  const addChat_data = {
    agent_id: agent_id,
    channel_id: "73564b12-a136-4695-8adc-a3952b8f8bad",
    customer_id: cus
  };
  const addChat = await chats.create(addChat_data);
  // Crée un nouveau message dans la nouvelle conversation
  const message_data = {
    sender_id: cus,
    chat_id: addChat, // Utilise l'identifiant de la nouvelle conversation
    message: data.msg,
    user_id: agent_id
  };

  const newMessage = await messages.create(message_data);
  console.log("ttt", newMessage);


}
}

})

app.use(passport.initialize());

io.on('connection', () =>{
  console.log('a user is connected')
 })
require('./src/customer/customer-route').config(app)
require('./src/chats/chat.routes').config(app)
require('./src/messages/messages_routes').config(app)
require('./src/chanels/channel.routes').config(app)
require('./src/users/users_routes').config(app)
app.listen(port, () => {
  console.log(`App is running on port ${port}.`);


  
},


);
