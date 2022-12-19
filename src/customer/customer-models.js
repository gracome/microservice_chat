const sequelize = require('../db/sequelize')
const _ = require('lodash')


module.exports.create = async (data) => {
    try {
        
        var records = await sequelize.query(`INSERT INTO customers (username) VALUES ($1)`,
            {
                bind: [data.username],
            }
        );
        return records;
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: message })
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
module.exports.findByPk =async (data) => {
      try {
       
        var records= await sequelize.query(`SELECT * FROM customers`
     
        );
        return records;
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: message })
    }
      }
    
