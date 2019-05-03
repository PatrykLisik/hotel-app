'use strict'
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Roles', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    CanViewAllUsers: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    CanCRUDRooms: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    CanViewAllReservations: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    CanEditAllReservations: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }

  })

  Role.associate = (models) => {
    Role.belongsToMany(models.Users, {
      through: 'User_Roles'
    })
  }
  return Role
}
