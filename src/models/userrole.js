'use strict'
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    name: DataTypes.STRING,
    canViewAllUsers: DataTypes.BOOLEAN,
    canCRUDRooms: DataTypes.BOOLEAN,
    canViewAllReservations: DataTypes.BOOLEAN,
    canEditAllReservations: DataTypes.BOOLEAN,
    canAddRoles: DataTypes.BOOLEAN
  }, {})
  UserRole.associate = function (models) {
    // associations can be defined here
  }
  return UserRole
}
