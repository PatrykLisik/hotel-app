const idPolicy = require('../Middleware/IdRequire.js')
const authorization = require('../Middleware/Authorization/AuthorizeRole')
const RolesENUM = require('../Middleware/Authorization/Roles')

const express = require('express')
const router = express.Router()
// User api
const userController = require('../Controllers/UserController')
const userCreationPolicy = require('../Middleware/policies/UserPolicy')

router.post('/user',
  userCreationPolicy.register,
  userController.register
)

router.post('/login', userController.login)

router.put('/user',
  idPolicy.requireIdInBody,
  authorization.authorizeRoleFactoryMethod(RolesENUM.User),
  userCreationPolicy.update,
  userController.update)

router.delete('/user',
  idPolicy.requireIdInBody,
  authorization.authorizeRoleFactoryMethod(RolesENUM.User),
  userController.delete)

router.get('/user/all',
  authorization.authorizeRoleFactoryMethod(RolesENUM.Manager),
  userController.getAll)

router.get('/user',
  authorization.authorizeRoleFactoryMethod([RolesENUM.Manager, RolesENUM.User]),
  userController.getOne)

module.exports = router
