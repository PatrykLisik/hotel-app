'use strict'
module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoices', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  Invoice.associate = (models) => {
    Invoice.hasMany(models.Reservations)
  }
  return Invoice
}
