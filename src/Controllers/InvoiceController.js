const {
  Invoice,
  Reservation,
  Room
} = require('../models')
const moment = require('moment')

module.exports = {
  async getAll (req, res) {
    Invoice.findAll()
      .then(invoices => {
        res.send(invoices)
      })
      .catch(err => {
        res.status(400).send({
          error: err
        })
      })
  },

  async getOne (req, res) {
    Invoice.findOne({
      where: {
        id: req.body.id
      }
    })
      .then(invoice => {
        res.send(invoice.toJSON())
      })
      .catch(err => {
        res.status(400).send(err)
      })
  },
  async create (req, res) {
    try {
      const reservations = await Reservation.findAll({
        where: {
          id: req.body.reservationIds
        }
      })

      let cost = 0
      for (let index = 0; index < reservations.length; ++index) {
        const reservation = reservations[index]
        const room = await Room.findOne({
          where: {
            id: reservation.roomId
          }
        })
        const start = moment(reservation.startDate)
        const end = moment(reservation.endDate)
        const duration = moment.duration(end.diff(start)).as('days')
        cost += room.cost * duration
      }

      const invoice = await Invoice.create({
        date: Date.now(),
        value: cost,
        paid: false
      })

      reservations.forEach(reservation => {
        reservation.update({
          invoiceId: invoice.id
        })
      })

      res.send(invoice.toJSON())
    } catch (err) {
      res.status(400).send({
        error: err.message
      })
    }
  },

  async delete (req, res) {
    Invoice.destroy({
      where: {
        id: req.body.id
      }
    }).then(result => {
      if (result === 1) {
        res.send({
          message: 'Invoice deleted successfully'
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

  async markAsPaid (req, res) {
    Invoice.update(
      {
        state: 'paid',
        payment_method: req.body.paymentMethod
      },
      {
        where: {
          id: req.body.id
        }
      })
      .then(() => {
        res.send({
          message: 'successful payment'
        })
      })
      .catch((err) => {
        res.status(400).send(err)
      })
  },
  async getInvoicesOfUser (req, res) {
    const InvoiceIds = await Reservation.findAll({
      where: {
        clientId: req.query.clientId
      },
      attributes: ['invoiceId'],
      distinct: true
    })
    let ids = []
    for (let i = 0; i < InvoiceIds.length; i++) {
      ids.push(InvoiceIds[i].invoiceId)
    }
    Invoice.findAll({
      where: {
        id: ids
      }
    }).then(invoices => {
      res.send(invoices)
    }).catch(error => {
      res.status(400).send({
        error: error.message
      })
    })
  }

}
