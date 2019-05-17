'use strict'
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    name: DataTypes.STRING
  }, {})
  UserRole.associate = function (models) {
    // associations can be defined here
  }
  return UserRole
}
