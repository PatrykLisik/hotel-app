const RolesENUM = require('./Roles')
module.exports = {
  authorizeRoleFactoryMethod (roles = []) {
    if (typeof roles === 'string') {
      roles = [roles]
    }

    return (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' })
      }
      const payload = ''
      const role = payload.roleJSON.name

      if (roles.includes(role) || role === RolesENUM.Admin) {
        return next()
      }
      return res.status(403).json({ error: 'Permission denied' })
    }
  }
}
