const {
  Room,
  RoomEquipment
} = require('../models')

module.exports = {
  async getAll (req, res) {
    Room.findAll(
      {
        include: [{
          model: RoomEquipment
        }]
      }
    )
      .then(rooms => {
        res.send(rooms)
      })
      .catch(error => {
        res.status(400).send({
          error: error.message
        })
      })
  },

  async getOne (req, res) {
    try {
      const id = req.body.id
      const room = await Room.findOne({
        where: {
          id: id
        },
        include: [{
          model: RoomEquipment
        }]
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
      const roomEQ = await RoomEquipment.findOrCreate({ where: req.body.roomEquipment })
      req.body['roomEquipmentsId'] = roomEQ[0].dataValues.id
      const room = await Room.create(req.body)
      if (!room) {
        return res.status(400).send({
          error: 'room data incorrect'
        })
      }
      res.send(room.toJSON())
    } catch (err) {
      res.status(500).send({
        error: err.message
      })
    }
  },

  async update (req, res) {
    RoomEquipment.findOrCreate({ where: req.body.update.roomEquipment })
      .then(roomEQ => {
        return roomEQ[0].dataValues.id
      })
      .then((roomEQId) => {
        req.body.update['roomEquipmentsId'] = roomEQId
        return Room.update(req.body.update, {
          where: {
            id: req.body.id
          }
        })
      })
      .then(result => {
        if (result[0] === 1) {
          res.send({
            message: 'successful update'
          })
        } else {
          res.status(400).send({
            message: 'unsuccessful update'
          })
        }
      })
      .catch(err => {
        res.status(400).send({
          error: err.message
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
