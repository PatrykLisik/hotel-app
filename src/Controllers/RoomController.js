const {
  Room
} = require('../models')

module.exports = {
  async getAll (req, res) {
    try {
      const rooms = await Room.findAll()
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
  },

  async update (req, res) {
    Room.update(req.body.update, {
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
    Room.destroy({
      where: {
        id: req.body.id
      }
    }).then(result => {
      if (result === 1) {
        res.send({
          message: 'Room deleted successfully'
        })
      } else {
        res.status(400).send({
          message: 'unsuccessful deletion'
        })
      }
    }).catch(err => {
      res.status(400).send({
        error: err
      })
    })
  }

}
