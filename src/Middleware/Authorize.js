const config = require('../config/config')
const jwt = require('jsonwebtoken')
const secret = config.authentication.secret
const { Reservation } = require('../models')

function returnFalse () {
  return false
}

function isUserIdSameInTokenAndBody (req, res, next, tokenPayload) {
  return req.body.id === tokenPayload.userJSON.id
}

function isUserAndClientIdSame (req, res, next, tokenPayload) {
  return req.body.clientId === tokenPayload.userJSON.id
}

function isAssociatedReservation (req, res, next, tokenPayload) {
  Reservation.findOne({
    where: {
      id: req.body.roomId
    }
  }).then(reservation => {
    if (!tokenPayload.userJSON.id) {
      return false
    }

    if (!reservation) {
      return false
    }
    return reservation.clientId === tokenPayload.userJSON.id
  })
}

module.exports = {
  authorizeFactoryMethod (permissionName, preConditions = returnFalse) {
    return (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' })
      }

      const token = req.headers.authorization.split(' ')[1]
      const payload = jwt.verify(token, secret)
      const roleJSONElement = payload.roleJSON[permissionName]

      console.log(payload)
      console.log('Permission: ' + roleJSONElement)

      if (preConditions(req, res, next, payload)) {
        return next()
      }
      if (roleJSONElement) {
        console.log('next')
        return next()
      }
      return res.status(403).json({ error: 'Permission denied' })
    }
  },
  isUserIdOrRequirePermission (permissionName) {
    return this.authorizeFactoryMethod(permissionName, isUserIdSameInTokenAndBody)
  },
  isUserAndClientIdSameOrRequirePermission (permissionName) {
    return this.authorizeFactoryMethod(permissionName, isUserAndClientIdSame)
  },
  isAssociatedReservationOrRequirePermission (permissionName) {
    return this.authorizeFactoryMethod(permissionName, isAssociatedReservation)
  }
}
