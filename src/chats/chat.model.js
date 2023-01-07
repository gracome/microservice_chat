const sequelize = require('../db/sequelize');
const _ = require('lodash');
const conversations =require ('./chat');
const { v4: uuidv4 } = require('uuid');



module.exports.create = async(data) => {
      try {
        var id= uuidv4();
        var records= await sequelize.query(`INSERT INTO conversations ("id","agent_id", "channel_id", "customer_id", "created_date", "opened_date") VALUES ($1,$2,$3,$4,$5,$6)` ,
        {
          bind: [id, data.agent_id, data.channel_id, data.customer_id, new Date, new Date],
        }
        );
        return id;
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
      
        var records= await sequelize.query(
           `SELECT "conversations".*, "customers"."username",(SELECT "message" FROM "messages" WHERE "messages"."chat_id"="conversations"."id" order by "messages"."createdAt" desc limit 1) AS "last_message", (SELECT "created_at" FROM "messages" WHERE "messages"."chat_id"="conversations"."id" order by "messages"."createdAt" desc limit 1) AS "message_date" FROM "conversations", "utilisateurs", "customers" WHERE "conversations"."agent_id"="utilisateurs"."id" AND "conversations"."customer_id"="customers"."id" AND "utilisateurs"."id" =$1 `,
          {
              bind: [data.id],
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

module.exports.assign = async () => {
  // Assignment process
  // The conversation is assigned to an agent which is active and have the
  // lowest rate of open conversations
  // Checking if there is an agent which is active and have no conversations yet
  let active = await sequelize.query(
      `SELECT "utilisateurs"."id", "utilisateurs"."username" FROM "utilisateurs"
          WHERE "utilisateurs"."status"=true and "utilisateurs"."id" not in
              (SELECT "utilisateurs"."id" FROM "utilisateurs", "conversations"
                      WHERE "utilisateurs"."id"="conversations"."agent_id" and "utilisateurs"."status"=true
                      AND "conversations"."closed_date" is  NULL
                      GROUP BY "utilisateurs"."id")
          limit 1;`,
      {
          bind: []
      }
  );
  // If an agent is found , return him for assignation
  if (active[0][0] !== undefined)
      return active[0][0].id;
  else
  {
      // Search active agents with the low conversation rates
      let search = await sequelize.query(
          `SELECT "utilisateurs"."id", "utilisateurs"."username", COUNT(*) AS "nbre_chats" FROM "utilisateurs", "conversations"
              WHERE "utilisateurs"."id"="conversations"."agent_id" AND "utilisateurs"."status"=true
              AND "conversations"."closed_date" is NULL
              GROUP BY "utilisateurs"."id", "utilisateurs"."username"
              ORDER BY "nbre_chats" asc LIMIT 1`,
          {
              bind: []
          }
      );
      // Saving the agent id and return it
      const agent = search[0][0];
      return agent.id;
  }
};

module.exports.isChatOpened = async (id) => {
    console.log(id);
    const result = await sequelize.query(`SELECT * FROM "conversations" WHERE "conversations"."customer_id"=$1 AND "conversations"."closed_date" is null`,
    {
        bind: [id]
    });
    // If chat is opened send true
    if (result[0].length > 0)
        return result[0][0].id;
    else
        return null;
}

module.exports.openChat = async (data) => {
  try {
    const message = `La conversation est bien ouvert.`
     
      if (conversations.status == false) {
          
          let records= await sequelize.query('UPDATE conversations SET opened_date=$1 WHERE id=$2 ',
              {
                  bind: [new Date, data.id]
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
                  bind: [new Date, data.id]
              }
          );
          return records
      } else {
          return 'La conversation est déja  fermée'
         
      }
   }catch (error) {
      console.error(error);
      throw error;
  }
}






