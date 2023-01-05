module.exports = (sequelize, DataTypes) => {
    return sequelize.define('channel', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: {
          msg: 'Canal déjà enrégistrée.'
        }
       
      }
     
    })
  }
  