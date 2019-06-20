const idPolicy = require('../Middleware/IdRequire.js')
const AuthorizationBuilder = require('../Middleware/Authorization/ConditionalAuthorizationBuilder')
const RolesENUM = require('../Middleware/Authorization/Roles')
const RoleBuilder = require('../Middleware/Authorization/AuthorizeRole')

const ReservationBelongings = require('../Middleware/Authorization/Belonging/Reservation')
const express = require('express')
const router = express.Router()

const reservationController = require('../Controllers/ReservationController')

const belongsToUserOrIsManager = new AuthorizationBuilder()
  .start(RoleBuilder.requireRole(RolesENUM.User))
  .and(ReservationBelongings.clientIdToToken)
  .or(RoleBuilder.requireRole(RolesENUM.Manager))
  .build()

const isManager = new AuthorizationBuilder()
  .start(RoleBuilder.requireRole(RolesENUM.Manager))
  .build()

const reservationBelongsToUser = new AuthorizationBuilder()
  .start(RoleBuilder.requireRole(RolesENUM.User))
  .and(ReservationBelongings.reservationIdToUserFromToken)
  .or(RoleBuilder.requireRole(RolesENUM.Manager))
  .build()

router.post('/',
  belongsToUserOrIsManager,
  reservationController.createOne)

router.get('/all',
  isManager,
  reservationController.getAll)

router.get('/',
  idPolicy.requireIdInBody,
  reservationBelongsToUser,
  reservationController.getOne)

router.put('/',
  idPolicy.requireIdInBody,
  reservationBelongsToUser,
  reservationController.update)

router.delete('/',
  idPolicy.requireIdInBody,
  reservationBelongsToUser,
  reservationController.delete)

router.get('/room',
  reservationController.getReservationsOfRoom)

module.exports = router
