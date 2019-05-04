'use strict'
module.exports = (sequelize, DataTypes) => {
  const RoomEquipment = sequelize.define('RoomEquipment', {
    BedNumber: DataTypes.INTEGER,
    Teapot: DataTypes.BOOLEAN,
    TV: DataTypes.BOOLEAN,
    Balcony: DataTypes.BOOLEAN,
    Fridge: DataTypes.BOOLEAN,
    FreeBeverages: DataTypes.BOOLEAN
  }, {})
  RoomEquipment.associate = function (models) {
    // associations can be defined here
  }
  return RoomEquipment
};
