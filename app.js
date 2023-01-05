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
 var newCustomer;
try {
  console.log(data.send_id);
var reco =  sequelize.query(`SELECT * FROM customers WHERE customers.social_id=$1` ,
{
  bind: [ data.send_id],
} 
);

 console.log(reco);
  
  if( reco.data === undefined){
    newCustomer= '';
  }else 
 console.log (reco.data[0][0].id) 
 } catch (error) {
   console.error(error);
   throw error;
}
  
if(newCustomer=== ''){
  // create customer
  const customer_datas= {
    username: data.profile.first_name + ' ' + data.profile.last_name,
    social_id: data.send_id
  }
const newCus = await customer.create(customer_datas);
console.log(newCus);
  // assignation process
   const agent_id = await assignation.assign();
   console.log(",,,dd", agent_id); ;  
  // create chat
  const chat_datas= {
agent_id: agent_id,
channel_id: "73564b12-a136-4695-8adc-a3952b8f8bad",
customer_id: newCus,

  }
const newChat = await chats.create(chat_datas)
  // create message

mess_data= {
  sender_id: newCus,
  chat_id: newChat,
  message: data.msg,
  user_id: agent_id,
  is_readed: "false"

}
const newMessage= await messages.create(mess_data)
}else{
  if(chats.isChatOpened=== true){
    const agent_id = await assignation.assign();
    message_data= {
      sender_id: newCustomer,
      chat_id: chats.isChatOpened(),
      message: data.msg,
      user_id: agent_id
    }
    const addMessage= await messages.create(message_data)
  } else {
  
    const agent_id = await assignation.assign();
    addChat_data= {
    agent_id: agent_id,
    channel_id: "73564b12-a136-4695-8adc-a3952b8f8bad",
    customer_id: newCustomer,
  }

  const addChat = await chats.create(addChat_data);
  
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
