const {
  Room
} = require('../models')

module.exports = {
  async getAll (req, res) {
    try {
      const rooms = await Room.findAll()
      console.log(rooms)
      res.send(rooms)
    } catch (err) {
      res.status(400).send({
        error: err
      })
    }
  },

  async getOne (req, res) {
    try {
      const id = req.body.id
      const room = await Room.findOne({
        where: {
          id: id
        }
      })
      if (!room) {
        return res.status(400).send({
          error: 'id incorrect'
        })
      }
      res.send(room.toJSON())
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  },

  async createOne (req, res) {
    try {
      console.log(req.body)
      const room = await Room.create(req.body)
      if (!room) {
        return res.status(400).send({
          error: 'room data incorrect'
        })
      }
      res.send(room.toJSON())
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  }

}
