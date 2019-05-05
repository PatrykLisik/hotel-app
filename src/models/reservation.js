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
    Reservation.hasOne(models.User, {
      constraints: false,
      foreignKey: 'id'
    })
    Reservation.hasOne(models.Room, {
      constraints: false,
      foreignKey: 'id',
      targetKey: 'roomId',
      as: 'Room'
    })
    Reservation.hasOne(models.Invoice, {
      constraints: false,
      foreignKey: 'id'
    })
  }
  return Reservation
}
