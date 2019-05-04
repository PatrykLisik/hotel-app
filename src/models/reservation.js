'use strict'
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    StartDate: DataTypes.DATEONLY,
    EndDate: DataTypes.DATEONLY
  }, {})
  Reservation.associate = function (models) {
    // associations can be defined here
  }
  return Reservation
}
