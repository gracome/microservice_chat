const sequelize = require('../db/sequelize')
const _= require('lodash')
const { v4: uuidv4 } = require('uuid');

const Message = require('./messages');


module.exports.create = async (data) => {
  try {
    var id= uuidv4();
  var records=  await sequelize.query(`INSERT INTO messages ("id", "sender_id", "chat_id", "message","user_id", "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5,$6,$7)` ,
  {
    bind: [ id, data.sender_id, data.chat_id, data.message, data.user_id, new Date, new Date],
  }
  );
  console.log(records);
   return id;
  } catch (error) {
    console.error(error);
    throw error;
}
   
}

 
  module.exports.delete = async(data) => {
      try {
        
        var records= await sequelize.query(`DELETE FROM messages  WHERE messages.id= $1 ` ,
        {
          bind:[data.id]
        }
        );
        return records;
      } catch (error) {
          console.error(error);
          throw error;
      }
  };
  
  
  module.exports.update = async(data) => {
      try {
        
        var records= await sequelize.query(`UPDATE messages SET message = $1 WHERE messages.id= $2 ` ,
        {
          bind:[data.message, data.id ]
        }
        
        );
        return records;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


  module.exports.findAll = async() => {
      try {
       
        var records= await sequelize.query(`SELECT * FROM messages ` ,
        
        );
        return records;
      } catch (error) {
          console.error(error);
          throw error;
      }
  };
  
  



     
exports.getMessages = async (chatId) => {
  try {
    
  var records= await sequelize.query(`SELECT "sender_id","user_id", "chat_id", "message" FROM messages WHERE "messages"."chat_id" = $1 ORDER BY "messages"."createdAt" ASC`, {
  bind: [chatId],
});
return records;
} catch (error) {
console.error(error);
throw error;
}
};


module.exports.readMessage = async(data) => {
  try {
    
    var records= await sequelize.query(` UPDATE messages SET is_readed = $1 WHERE messages.id= $2  ` ,
  {
    bind: [data.is_readed,data.id ]
  }
    );
    return records;
} catch (error) {
console.error(error);
throw error;
}
};

module.exports.cus = async(id) => {
try {
    var reco =  await sequelize.query(`SELECT * FROM "customers" WHERE "customers"."social_id"=$1` ,
    {
      bind: [ id],
    } 
  );

  
 return reco[0][0].id ;
 } catch (error) {
   console.error(error);
   throw error;
}
};

