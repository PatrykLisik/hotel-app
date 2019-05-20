const idPolicy = require('../Middleware/IdRequire.js')
const AuthorizationBuilder = require('../Middleware/Authorization/ConditionalAuthorizationBuilder')
const RolesENUM = require('../Middleware/Authorization/Roles')
const RoleBuilder = require('../Middleware/Authorization/AuthorizeRole')

const express = require('express')
const router = express.Router()
const roomController = require('../Controllers/RoomController')
const roomPolicy = require('../Middleware/policies/RoomPolicy')

router.get('/',
  idPolicy.requireIdInBody,
  roomController.getOne)

router.get('/all',
  roomController.getAll)

const requireManagerRole = new AuthorizationBuilder()
  .start(RoleBuilder.requireRole(RolesENUM.Manager))
  .build()

router.post('/',
  requireManagerRole,
  roomPolicy.create,
  roomController.createOne)

router.put('/',
  idPolicy.requireIdInBody,
  requireManagerRole,
  roomPolicy.update,
  roomController.update)

router.delete('/',
  idPolicy.requireIdInBody,
  requireManagerRole,
  roomController.delete)

module.exports = router
