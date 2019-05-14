module.exports = (app) => {
  app.get('/test', (req, res) => {
    res.send({
      message: 'test endpoint Hello World!'
    })
  }
  )

  const idPolicy = require('./Middleware/IdRequire.js')
  const authorization = require('./Middleware/Authorize')
  const RolesENUM = require('./Middleware/Roles')

  // User api
  const userController = require('./Controllers/UserController')
  const userCreationPolicy = require('./Middleware/policies/UserPolicy')

  app.post('/user',
    userCreationPolicy.register,
    userController.register
  )

  app.post('/login', userController.login)

  app.put('/user',
    idPolicy.requireIdInBody,
    authorization.authorizeFactoryMethod(RolesENUM.User),
    userCreationPolicy.update,
    userController.update)

  app.delete('/user',
    idPolicy.requireIdInBody,
    authorization.authorizeFactoryMethod(RolesENUM.User),
    userController.delete)

  app.get('/user/all',
    authorization.authorizeFactoryMethod(RolesENUM.Manager),
    userController.getAll)

  app.get('/user',
    authorization.authorizeFactoryMethod([RolesENUM.Manager, RolesENUM.User]),
    userController.getOne)

  // Room api
  const roomController = require('./Controllers/RoomController')
  const roomPolicy = require('./Middleware/policies/RoomPolicy')

  app.get('/room',
    idPolicy.requireIdInBody,
    roomController.getOne)
  app.get('/room/all', roomController.getAll)

  app.post('/room',
    authorization.authorizeFactoryMethod(RolesENUM.Manager),
    roomPolicy.create,
    roomController.createOne)

  app.put('/room',
    idPolicy.requireIdInBody,
    authorization.authorizeFactoryMethod(RolesENUM.Manager),
    roomPolicy.update,
    roomController.update)

  app.delete('/room',
    idPolicy.requireIdInBody,
    authorization.authorizeFactoryMethod(RolesENUM.Manager),
    roomController.delete)

  // Reservation api
  const reservationController = require('./Controllers/ReservationController')
  app.post('/reservation',
    authorization.authorizeFactoryMethod(RolesENUM.User),
    reservationController.createOne)

  app.get('/reservation/all',
    authorization.authorizeFactoryMethod(RolesENUM.Manager),
    reservationController.getAll)

  app.get('/reservation',
    idPolicy.requireIdInBody,
    authorization.authorizeFactoryMethod(RolesENUM.User),
    reservationController.getOne)

  app.put('/reservation',
    idPolicy.requireIdInBody,
    authorization.authorizeFactoryMethod(RolesENUM.User),
    reservationController.update)

  app.delete('/reservation',
    idPolicy.requireIdInBody,
    authorization.authorizeFactoryMethod(RolesENUM.User),
    reservationController.delete)

  // Invoice api
  const invoiceController = require('./Controllers/InvoiceController')
  const invoicePolicy = require('./Middleware/policies/InvoicePolicy')

  app.post('/invoice',
    invoicePolicy.create,
    authorization.authorizeFactoryMethod(RolesENUM.User),
    invoiceController.create)

  app.post('/invoice/pay',
    idPolicy.requireIdInBody,
    authorization.authorizeFactoryMethod(RolesENUM.User),
    invoiceController.markAsPaid)

  app.get('/invoice/all',
    authorization.authorizeFactoryMethod(RolesENUM.Manager),
    invoiceController.getAll)

  app.get('/invoice',
    idPolicy.requireIdInBody,
    authorization.authorizeFactoryMethod(RolesENUM.User),
    invoiceController.getOne)

  app.delete('/invoice',
    idPolicy.requireIdInBody,
    authorization.authorizeFactoryMethod(RolesENUM.Admin),
    invoiceController.delete)
}
