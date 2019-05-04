'use strict'
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    StartDate: DataTypes.DATEONLY,
    EndDate: DataTypes.DATEONLY,
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    InvoiceId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Invoices',
        key: 'id'
      }
    }
  }, {})
  Reservation.associate = function (models) {
    Reservation.hasOne(models.User)
  }
  return Reservation
}
