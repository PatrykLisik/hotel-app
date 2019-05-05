'use strict'
module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    Date: DataTypes.DATEONLY,
    Value: DataTypes.DECIMAL,
    Payment_method: DataTypes.STRING,
    Paid: DataTypes.BOOLEAN
  }, {})
  Invoice.associate = function (models) {
    // associations can be defined here
  }
  return Invoice
}
