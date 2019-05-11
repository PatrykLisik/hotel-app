'use strict'
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    number: DataTypes.INTEGER,
    floor: DataTypes.INTEGER,
    peopleNumber: DataTypes.INTEGER,
    type: DataTypes.STRING,
    cost: DataTypes.DECIMAL(10, 2),
    roomEquipmentsId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'RoomEquipments',
        key: 'id'
      }
    }
  }, {})
  Room.associate = function (models) {
    Room.hasOne(models.RoomEquipment, {
      constraints: false,
      foreignKey: 'id'
    })
    // Room.belongsToMany('Reservation')
  }
  return Room
}
