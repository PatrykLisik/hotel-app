'use strict'
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    StartDate: DataTypes.DATEONLY,
    EndDate: DataTypes.DATEONLY,
    ClientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Rooms',
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
    Reservation.hasOne(models.Invoice)
  }
  return Reservation
}
