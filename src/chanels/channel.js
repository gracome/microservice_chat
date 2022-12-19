module.exports = (sequelize, DataTypes) => {
    return sequelize.define('channel', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        unique: {
          msg: 'Canal déjà enrégistrée.'
        }
       
      }
     
    })
  }
  