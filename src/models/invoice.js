'use strict'
module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    date: DataTypes.DATEONLY,
    value: DataTypes.DECIMAL,
    payment_method: DataTypes.STRING,
    paid: DataTypes.BOOLEAN
  }, {})
  Invoice.associate = function (models) {
    // associations can be defined here
  }
  return Invoice
}
