const { Reservation } = require('../../../models')
module.exports = {
  clientIdToToken (tokenPayload, req) {
    return tokenPayload.userJSON.id === req.body.clientId
  },
  reservationIdToUserFromToken (tokenPayload, req) {
    return Reservation.findOne({ where: {
      id: req.body.id
    } }).then(reservation => {
      return reservation.clientId === tokenPayload.userJSON.id
    })
      .catch(error => {
        console.log(error.message)
        return false
      })
  }
}
