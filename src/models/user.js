'use strict'
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
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Roles',
        key: 'id'
      }
    }
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
      beforeSave: hashPassword
    }
  })
  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }
  User.associate = function (models) {
    User.hasOne(models.UserRole)
  }
  return User
}
