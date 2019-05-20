const {
  Invoice,
  Reservation
} = require('../../../models')

module.exports = {
  isBelongingToUser (tokenPayload, req) {
    return Invoice.findOne({ where: {
      id: req.body.id
    } }).then(invoice => {
      return Reservation.findOne({ where: {
        invoiceId: invoice.id
      } }).then(reservation => {
        return tokenPayload.userJSON.id === reservation.clientId
      }).catch(error => {
        console.log('during finding reservation error occurred: ' + error.message)
        return false
      })
    }).catch(error => {
      console.log('during finding invoice error occurred: ' + error.message)
      return false
    })
  }
}
