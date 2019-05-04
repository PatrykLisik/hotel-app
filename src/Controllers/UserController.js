const jwt = require('jsonwebtoken')
const config = require('../config/config')
const {
  User,
  Roles
} = require('../models')

function jwtSignUser (user) {
  return jwt.sign(user, config.authentication.secret, {
    expiresIn: config.authentication.expire_time
  })
}

module.exports = {
  async register (req, res) {
    try {
      const userRole = await Roles.findOne({
        where: {
          name: config.default_role
        }
      })
      req.body['roleId'] = userRole.id
      const user = await User.create(req.body)
      res.send(user.toJSON())
    } catch (err) {
      res.status(400).send({
        error: err
      })
    }
  },

  async login (req, res) {
    try {
      const email = req.body.email
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'email incorrect'
        })
      }

      const password = req.body.password
      const isPasswordValid = user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'password incorrect'
        })
      }

      const userJSON = user.toJSON()
      res.send({
        user: userJSON,
        token: jwtSignUser(userJSON)
      })
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  }

}
