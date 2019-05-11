'use strict'
module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    date: DataTypes.DATEONLY,
    value: DataTypes.DECIMAL,
    payment_method: {
      type: DataTypes.ENUM,
      values: ['card', 'cash', 'transfer']
    },
    state: {
      type: DataTypes.ENUM,
      values: ['paid', 'not paid']
    }
  }, {})
  Invoice.associate = function (models) {
    // associations can be defined here
  }
  return Invoice
}
