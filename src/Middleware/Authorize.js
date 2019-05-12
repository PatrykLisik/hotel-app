const config = require('../config/config')
const jwt = require('jsonwebtoken')
const secret = config.authentication.secret

module.exports = {
  authorizeFactoryMethod (permissionName) {
    return (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' })
      }

      const token = req.headers.authorization.split(' ')[1]
      const payload = jwt.verify(token, secret)
      const roleJSONElement = payload.roleJSON[permissionName]

      if (roleJSONElement) {
        next()
      } else {
        return res.status(403).json({ error: 'Permission denied' })
      }
    }
  }
}
