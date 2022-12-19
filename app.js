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

require("./config/passport");


app.use(passport.initialize());


require('./src/customer/customer-route').config(app)
require('./src/chats/chat.routes').config(app)
require('./src/messages/messages_routes').config(app)
require('./src/users/users_routes').config(app)
app.listen(port, () => {
  console.log(`App is running on port ${port}.`);
});