'use strict'
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    name: DataTypes.STRING,
    CanViewAllUsers: DataTypes.BOOLEAN,
    CanCRUDRooms: DataTypes.BOOLEAN,
    CanViewAllReservations: DataTypes.BOOLEAN,
    CanEditAllReservations: DataTypes.BOOLEAN,
    CanAddRoles: DataTypes.BOOLEAN
  }, {})
  UserRole.associate = function (models) {
    // associations can be defined here
  }
  return UserRole
}
