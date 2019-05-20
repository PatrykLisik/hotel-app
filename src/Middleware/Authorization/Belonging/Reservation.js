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
  },
  async reservationListToUser (tokenPayload, req) {
    const reservations = await Reservation.findAll({ where: {
      id: req.body.reservationIds
    } })
    for (const reservation of reservations) {
      if (reservation.clientId !== tokenPayload.userJSON.id) {
        return false
      }
    }
    return true
  }
}
