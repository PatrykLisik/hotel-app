const {
  Users
} = require('../models')

module.exports = {
  async register (req, res) {
    try {
      const user = await Users.create(req.body)
      res.send(user.toJSON())
    } catch (err) {
      res.status(400).send({
        error: err
      })
    }
  }
}
