const RolesENUM = require('./Roles')
module.exports = {
  requireRole (roles = []) {
    if (typeof roles === 'string') {
      roles = [roles]
    }

    return (payload, req) => {
      const role = payload.roleJSON.name
      return roles.includes(role) || role === RolesENUM.Admin
    }
  },
  authorizeRoleFactoryMethod (roles = []) {
    return (req, res, next) => {
      next()
    }
  }
}
