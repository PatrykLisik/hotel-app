'use strict'
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Roles', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING
  })

  Role.associate = (models) => {
    Role.belongsToMany(models.Users, {
      through: 'User_Roles'
    })
  }
  return Role
}
