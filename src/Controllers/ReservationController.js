const {
  Reservation
} = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  async getAll (req, res) {
    try {
      const reservation = await Reservation.findAll()
      res.send(reservation)
    } catch (err) {
      res.status(400).send({
        error: err
      })
    }
  },

  async getOne (req, res) {
    try {
      const id = req.body.id
      const reservation = await Reservation.findOne({
        where: {
          id: id
        }
      })
      if (!reservation) {
        return res.status(400).send({
          error: 'id incorrect'
        })
      }
      res.send(reservation.toJSON())
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  },

  async createOne (req, res) {
    try {
      console.log(req.body)

      const OverlappingReservations = await Reservation.findAll({
        where: {
          roomId: req.body.roomId,
          StartDate: {
            [Op.lt]: req.body.EndDate
          },
          EndDate: {
            [Op.gt]: req.body.StartDate
          }
        }
      })
      console.log(OverlappingReservations)
      if (OverlappingReservations && OverlappingReservations.length) {
        return res.status(400).send({
          error: 'reservation date overlaps with other reservations'
        })
      }
      const reservation = await Reservation.create(req.body)
      if (!reservation) {
        return res.status(400).send({
          error: 'reservation data incorrect'
        })
      }
      res.send(reservation.toJSON())
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  }

}
