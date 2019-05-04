'use strict'
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    Number: DataTypes.INTEGER,
    Floor: DataTypes.INTEGER,
    PeopleNumber: DataTypes.INTEGER,
    Type: DataTypes.STRING,
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
    Room.hasOne(models.RoomEquipment)
  }
  return Room
}
