const sequelize = require('../db/sequelize')
const _ = require('lodash')
const { v4: uuidv4 } = require('uuid');


module.exports.create = async (data) => {
    try {
        var id= uuidv4();
        var records = await sequelize.query(`INSERT INTO customers ("id", "username", "social_id", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5)`,
            {
                bind: [id, data.username, data.social_id, new Date(), new Date()],
            }
        );
        return id;
    } catch (error) {
        console.error(error)
    }
}

module.exports.update =async (data) => {
      try {
      
        var records= await sequelize.query(`UPDATE customers SET name = $1 WHERE customers.id= $2 ` ,
        {
          bind:[data.name, data.id ]
        }
        
        );
        return records;
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: message })
    }
}

module.exports.findAll =async (data) => {
      try {
        
        let records= await sequelize.query(`SELECT * FROM customers WHERE customers.id = $1 ` ,
      {
        bind:[ data.id]
      }
        
        );
        return records;
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: message })
    }
}
module.exports.findByPk =async () => {
      try {
       
        var records= await sequelize.query(`SELECT ("id", "username") FROM customers`
     
        );
        return records;
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: message })
    }
      }
    
