const express = require('express');
const app = express();
const port = 5000;
const sequelize= require('sequelize')
const sequelise= require('./src/db/sequelize')
const _ = require("lodash");
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require("passport");
app.use(express.json());


const NRP = require("node-redis-pubsub");
// NRP initialisation
const nrp = new NRP({
    PORT: 6379,
    scope: "microservice"
});
require("./config/passport");




nrp.on("NEW_MESSAGE", data => {
  console.log(data);
 // Call messenger service to handle the incomming message
 // If no error has occured then emit on socket io for the front app
});
app.use(passport.initialize());


require('./src/customer/customer-route').config(app)
require('./src/chats/chat.routes').config(app)
require('./src/messages/messages_routes').config(app)
require('./src/users/users_routes').config(app)
app.listen(port, () => {
  console.log(`App is running on port ${port}.`);
});
