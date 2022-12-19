const sequelize = require('../db/sequelize')
const _= require('lodash')


module.exports.create = async (data) => {
   
      try {
        var records= await sequelize.query(`INSERT INTO messages (sender_id, chat_id, message,user_id) VALUES ($1,$2,$3,$4)` ,
        {
          bind: [ data.sender_id, data.chat_id, data.message, data.user_id],
        }
        );
        return records;
      } catch (error) {
          console.error(error);
          throw error;
      }
  };
  
  

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


  module.exports.findAll = async(data) => {
      try {
       
        var records= await sequelize.query(`SELECT * FROM messages ` ,
        
        );
        return records;
      } catch (error) {
          console.error(error);
          throw error;
      }
  };
  
  

      module.exports.findByPk = async(data) => {
          try {
            
            var records= await sequelize.query(`SELECT * FROM messages WHERE messages.id = $1 ` ,
          {
            bind: [data.id]
          }
            );
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

