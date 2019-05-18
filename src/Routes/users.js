const idPolicy = require('../Middleware/IdRequire.js')
const AuthorizationBuilder = require('../Middleware/Authorization/AuthorizationBuilder')
const RolesENUM = require('../Middleware/Authorization/Roles')

const express = require('express')
const router = express.Router()
// User api
const userController = require('../Controllers/UserController')
const userCreationPolicy = require('../Middleware/policies/UserPolicy')

const userBelongings = require('../Middleware/Authorization/Belonging/UserBelonging')

// create new user
router.post('/user',
  userCreationPolicy.register,
  userController.register
)

// log in existing user
router.post('/login', userController.login)

// update
const authorizeUpdate = new AuthorizationBuilder()
  .requireRole(RolesENUM.User)
  .addBelongingFunction(userBelongings.userUpdate)
  .build()

router.put('/user',
  idPolicy.requireIdInBody,
  authorizeUpdate,
  userCreationPolicy.update,
  userController.update)

router.delete('/user',
  idPolicy.requireIdInBody,
  authorizeUpdate,
  userController.delete)

const authorizeGetALL = new AuthorizationBuilder()
  .requireRole(RolesENUM.Manager)
  .build()

router.get('/user/all',
  authorizeGetALL,
  userController.getAll)

router.get('/user',
  //authorization.authorizeRoleFactoryMethod([RolesENUM.Manager, RolesENUM.User]),
  userController.getOne)

module.exports = router
