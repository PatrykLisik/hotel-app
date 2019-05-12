'use strict'
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    name: DataTypes.STRING,
    canViewAllUsers: DataTypes.BOOLEAN,
    canCRUDRooms: DataTypes.BOOLEAN,
    canViewAllReservations: DataTypes.BOOLEAN,
    canEditAllReservations: DataTypes.BOOLEAN,
    canAddRoles: DataTypes.BOOLEAN,
    canCRUDUsers: DataTypes.BOOLEAN,
    canCRUDAllReservations: DataTypes.BOOLEAN,
    canViewAllInvoices: DataTypes.BOOLEAN,
    canPayInvoice: DataTypes.BOOLEAN,
    canCreateInvoice: DataTypes.BOOLEAN,
    canDeleteInvoice: DataTypes.BOOLEAN
  }, {})
  UserRole.associate = function (models) {
    // associations can be defined here
  }
  return UserRole
}
