const config = require('../../config/config')
const jwt = require('jsonwebtoken')
const secret = config.authentication.secret
const RolesENUM = require('./Roles')

function getPayload (token) {
  // token  is like 'Bearer 131dada2314£3432...'
  const actualToken = token.split(' ')[1]
  return jwt.verify(actualToken, secret)
}

module.exports = class AuthorizationBuilder {
  constructor () {
    this.roles = []
    this.belongingFucnticons = []
  }
  requireRole (roles = []) {
    if (typeof roles === 'string') {
      roles = [roles]
    }
    this.roles = this.roles.concat(roles)
    return this
  }

  addBelongingFunction (func) {
    this.belongingFucnticons.push(func)
    return this
  }

  build () {
    return (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' })
      }

      let payload = ''
      try {
        payload = getPayload(req.headers.authorization)
      } catch (err) {
        return res.status(403).send({
          error: err.message
        })
      }

      const role = payload.roleJSON.name

      if (role === RolesENUM.Admin) {
        next()
      }

      this.belongingFucnticons.forEach(func => {
        if (!func(payload, req)) {
          return res.status(403).send({
            error: 'You do not have permission to perform this action'
          })
        }
      })

      if (this.roles.includes(role)) {
        return next()
      }
      return res.status(403).json({ error: 'Permission denied' })
    }
  }
}
