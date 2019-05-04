'use strict'
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    id: DataTypes.INTEGER,
    Number: DataTypes.INTEGER,
    Floor: DataTypes.INTEGER,
    PeopleNumber: DataTypes.INTEGER,
    Type: DataTypes.STRING,
    cost: DataTypes.DECIMAL(10, 2)
  }, {})
  Room.associate = function (models) {
    // associations can be defined here
  }
  return Room
}
