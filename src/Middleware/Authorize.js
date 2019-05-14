const config = require('../config/config')
const jwt = require('jsonwebtoken')
const secret = config.authentication.secret
const roles = require('./Roles')

module.exports = {
  authorizeFactoryMethod (permissionName, roles = []) {
    if (typeof roles === 'string') {
      roles = [roles]
    }
    return (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' })
      }

      const token = req.headers.authorization.split(' ')[1]
      const payload = jwt.verify(token, secret)
      const role = payload.roleJSON.name

      if (roles.includes(role) || role === role.Admin) {
        console.log('next')
        return next()
      }
      return res.status(403).json({ error: 'Permission denied' })
    }
  }
}
