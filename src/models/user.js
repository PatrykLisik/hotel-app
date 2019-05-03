const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))
const config = require('../config/config')

function hashPassword (user, options) {
  const SALT_FACTOR = config.authentication.salt_factor

  if (!user.changed('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

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
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
      beforeSave: hashPassword
    }
  })

  Users.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }

  Users.associate = (models) => {
    Users.belongsToMany(models.Roles, {
      through: 'User_Roles'
    })
    Users.belongsTo(models.Contact_Forms)
  }

  return Users
}
