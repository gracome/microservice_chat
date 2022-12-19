const sequelize = require('../db/sequelize');
const _ = require('lodash');
const conversations =require ('./chat');



module.exports.create = async(data) => {
      try {
        
        var records= await sequelize.query(`INSERT INTO conversations (agent_id, channel_id, customer_id, created_date, opened_date, closed_date) VALUES ($1,$2,$3,$4,$5,$6)` ,
        {
          bind: [data.agent_id, data.channel_id, data.customer_id, data.created_date, data.opened_date, data.closed_date],
        }
        );
        return records;
      } catch (error) {
          console.error(error);
          throw error;
      }
  };
  
  

module.exports.delete =async(data) => {   
   try {
        
        var records= await sequelize.query(`DELETE FROM conversations  WHERE conversations.id= $1 ` ,
        {
         bind:[ data.id]
        }
        );
        return records;
      } catch (error) {
          console.error(error);
          throw error;
      }
  };
  
  
module.exports.update =async (data) => {
      try {
       
        var records= await sequelize.query(`UPDATE conversations SET status = $1 WHERE conversations.id= $2 ` ,
        
        {
          bind:[data.status, data.id]
        }
        );
        return records;
    } catch (error) {
        console.error(error);
        throw error;
    }
};



module.exports.findAll =async (data) => {
      try {
       
        var records= await sequelize.query(`SELECT * FROM conversations ` ,
        
        );
        return records;
      } catch (error) {
          console.error(error);
          throw error;
      }
  };
  
  

module.exports.findByPk = async(data) => {
      try {
      
        var records= await sequelize.query(`SELECT * FROM conversations WHERE conversations.id = $1 ` ,
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

module.exports.findListBy = async(data) => {
  try {
  
    var records= await sequelize.query(`SELECT * FROM conversations WHERE agent_id = $1 ` ,
  {
    bind:[data.agent_id]
  }
    
    );
    return records;
} catch (error) {
    console.error(error);
    throw error;
}
};

module.exports.assigned_to_users = async(data) => {
  try {
   
    var records= await sequelize.query(`INSERT INTO assignations (chat_id,user_id, agent_Response_date, end_date) VALUES ($1,$2,$3,$4)` ,
    {
      bind: [data.conversation_id, data.user_id, data.agent_Response_date, data.end_date],
    }
    );
    return records;
  } catch (error) {
      console.error(error);
      throw error;
  }
};


module.exports.openChat = async (data) => {
  try {
    const message = `Le message est bien ouvert.`
     
      if (conversations.status == false) {
          
          let records= await sequelize.query('UPDATE conversations SET opened_date= $1 WHERE id= $2 ',
              {
                  bind: [data.opened_date, data.id]
              }
          );
          return records
      } else {
          return 'La conversation déja ouverte'
         
      }
   }catch (error) {
      console.error(error);
      throw error;
  }
}

module.exports.closeChat = async (data) => {
  try {
     
      if (conversations.status == true) {
          
          let records= await sequelize.query('UPDATE conversations SET closed_date= $1 WHERE id= $2 ',
              {
                  bind: [data.closed_date, data.id]
              }
          );
          return records
      } else {
          return 'La conversation déja est fermée'
         
      }
   }catch (error) {
      console.error(error);
      throw error;
  }
}






