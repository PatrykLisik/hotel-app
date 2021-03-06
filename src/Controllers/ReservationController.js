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
      const OverlappingReservations = await Reservation.findAll({
        where: {
          roomId: req.body.roomId,
          startDate: {
            [Op.lt]: req.body.endDate
          },
          endDate: {
            [Op.gt]: req.body.startDate
          }
        }
      })

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
  },

  async update (req, res) {
    Reservation.update(req.body.update, {
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
      res.status(500).send({
        error: err.message
      })
    })
  },

  async delete (req, res) {
    Reservation.destroy({
      where: {
        id: req.body.id
      }
    }).then(result => {
      if (result === 1) {
        res.send({
          message: 'reservation deleted successfully'
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
  },

  async getReservationsOfRoom (req, res) {
    Reservation.findAll({
      where: {
        roomId: req.query.id
      }
    }).then(reservations => {
      res.send(reservations)
    }).catch(error => {
      res.status(400).send({
        error: error.message
      })
    })
  },
  async getReservationsOfClient (req, res) {
    Reservation.findAll({
      where: {
        clientId: req.query.clientId
      }
    }).then(reservations => {
      res.send(reservations)
    }).catch(error => {
      res.status(400).send({
        error: error.message
      })
    })
  }

}
