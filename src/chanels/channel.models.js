const sequelize = require('../db/sequelize');
const _ = require('lodash');

module.exports.create = async (data) => {
  try {
    var records = await sequelize.query(`INSERT INTO channels (name) VALUES ($1)`,
      {
        bind: [data.name],
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
    let records = await sequelize.query(`SELECT * FROM channels WHERE channels.name = $1 `,
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
