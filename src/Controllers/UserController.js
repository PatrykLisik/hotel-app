const jwt = require('jsonwebtoken')
const config = require('../config/config')
const {
  User,
  UserRole
} = require('../models')

function jwtSignUser (payload) {
  return jwt.sign(payload, config.authentication.secret, {
    expiresIn: config.authentication.expire_time
  })
}

module.exports = {
  async register (req, res) {
    try {
      const userRole = await UserRole.findOne({
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
      const role = await UserRole.findOne({
        where: {
          id: user.roleId
        }
      })
      const userJSON = user.toJSON()
      const roleJSON = role.toJSON()
      res.send({
        user: userJSON,
        token: jwtSignUser(
          { userJSON, roleJSON }
        ),
        role: roleJSON
      })
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  },
  async update (req, res) {
    User.update(req.body.update, {
      where: {
        id: req.body.id
      }
    }).then(result => {
      if (result[0] === 1) {
        res.send({
          message: 'successful update'
        })
      } else {
        res.status(400).send({
          message: 'unsuccessful update'
        })
      }
    }).catch(err => {
      res.status(400).send({
        error: err
      })
    })
  },

  async delete (req, res) {
    User.destroy({
      where: {
        id: req.body.id
      }
    }).then(result => {
      if (result === 1) {
        res.send({
          message: 'user deleted successfully'
        })
      } else {
        res.status(400).send({
          message: 'can not delete'
        })
      }
    }).catch(err => {
      res.status(400).send({
        error: err
      })
    })
  },

  async getAll (req, res) {
    User.findAll().then(users => {
      res.send(users)
    }).catch(err => {
      res.status(400).send({
        error: err
      })
    })
  },

  async getOne (req, res) {
    User.findOne({
      where: {
        id: req.body.id
      }
    }).then(user => {
      if (user) {
        res.send(user.toJSON())
      } else {
        res.status(400).send({
          error: 'No user with provided id'
        })
      }
    }).catch(err => {
      res.status(500).send({
        error: err
      })
    })
  }
}
