const config = require('../config/config')
const jwt = require('jsonwebtoken')
const secret = config.authentication.secret

function returnFalse () {
  return false
}

function isUserIdSameInTokenAndBody (req, res, next, tokenPayload) {
  return req.body.user.id === tokenPayload.user.id
}

function isUserAndClientIdSame (req, res, next, tokenPayload) {
  return req.body.user.clientId === tokenPayload.user.id
}

module.exports = {
  authorizeFactoryMethod (permissionName, preConditions = returnFalse) {
    return (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' })
      }

      const token = req.headers.authorization.split(' ')[1]
      const payload = jwt.verify(token, secret)
      const roleJSONElement = payload.roleJSON[permissionName]

      if (preConditions()) {
        next()
      }
      if (roleJSONElement) {
        next()
      }
      return res.status(403).json({ error: 'Permission denied' })
    }
  },
  isUserIdOrRequirePermission (permissionName) {
    this.authorizeFactoryMethod(permissionName, isUserIdSameInTokenAndBody)
  },
  isUserAndClientIdSameOrRequirePermission (permissionName) {
    this.authorizeFactoryMethod(permissionName, isUserAndClientIdSame)
  }
}


