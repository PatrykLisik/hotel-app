module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    passHash: DataTypes.STRING
  })

  Users.associate = (models) => {
    Users.belongsToMany(models.Roles, {
      through: 'User_Roles'
    })
  }

  return Users
}
