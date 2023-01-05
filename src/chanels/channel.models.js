const sequelize = require('../db/sequelize');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');


module.exports.create = async (data) => {
  try {
    var id= uuidv4();
    var records = await sequelize.query(`INSERT INTO channels ("id", "name", "createdAt", "updatedAt") VALUES ($1, $2, $3,$4)`,
      {
        bind: [id, data.name, new Date, new Date]
      }
    );
    return records;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports.delete = async (data) => {

  try {
    let records = await sequelize.query(`DELETE FROM channels  WHERE channels.name= $1`,
      {
        bind: [data.name]
      }
    );
    return records;
  } catch (error) {
    console.error(error);
    throw error;
  }

}

module.exports.update = async (data) => {
  try {
    let records = await sequelize.query(`UPDATE channels SET name = $1 WHERE id= $2 `,
      {
        bind: [data.name, data.id]
      }

    );

    return records;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports.findAll = async (data) => {
  try {
    let records = await sequelize.query(`SELECT * FROM channels`);

    return records;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports.findByPK = async (data) => {
  try {
    var id= uuidv4();
    let records = await sequelize.query(`SELECT ("id") FROM channels WHERE channels.id=$1 `,
      {
        bind: [data.id]
      }

    );

    return id;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
