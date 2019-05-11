'use strict'
module.exports = (sequelize, DataTypes) => {
  const RoomEquipment = sequelize.define('RoomEquipment', {
    bedNumber: DataTypes.INTEGER,
    teapot: DataTypes.BOOLEAN,
    tv: DataTypes.BOOLEAN,
    balcony: DataTypes.BOOLEAN,
    fridge: DataTypes.BOOLEAN,
    freeBeverages: DataTypes.BOOLEAN
  }, {})
  RoomEquipment.associate = function (models) {
    // associations can be defined here
  }
  return RoomEquipment
}
