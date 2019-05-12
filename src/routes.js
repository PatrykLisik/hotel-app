module.exports = (app) => {
  app.get('/test', (req, res) => {
    res.send({
      message: 'test endpoint Hello World!'
    })
  })
  const idPolicy = require('./Middleware/IdRequire.js')
  const authorization = require('./Middleware/Authorize')

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
    authorization.isUserIdOrRequirePermission('CanViewAllUsers'),
    userCreationPolicy.update,
    userController.update)
  app.delete('/user',
    idPolicy.requireIdInBody,
    authorization.isUserIdOrRequirePermission('CanCRUDUsers'),
    userController.delete)
  app.get('/user/all',
    authorization.authorizeFactoryMethod('canViewAllUsers'),
    userController.getAll)
  app.get('/user',
    authorization.isUserIdOrRequirePermission('CanCRUDUsers'),
    userController.getOne)

  // Room api
  const roomController = require('./Controllers/RoomController')
  const roomPolicy = require('./Middleware/policies/RoomPolicy')

  app.get('/room',
    idPolicy.requireIdInBody,
    roomController.getOne)
  app.get('/room/all', roomController.getAll)
  app.post('/room',
    authorization.authorizeFactoryMethod('canCRUDRooms'),
    roomPolicy.create,
    roomController.createOne)
  app.put('/room',
    idPolicy.requireIdInBody,
    authorization.authorizeFactoryMethod('canCRUDRooms'),
    roomPolicy.update,
    roomController.update)
  app.delete('/room',
    idPolicy.requireIdInBody,
    authorization.authorizeFactoryMethod('canCRUDRooms'),
    roomController.delete)

  // Reservation api
  const reservationController = require('./Controllers/ReservationController')
  app.post('/reservation', reservationController.createOne)
  app.get('/reservation/all',
    authorization.authorizeFactoryMethod('canViewAllReservations'),
    reservationController.getAll)
  app.get('/reservation',
    idPolicy.requireIdInBody,
    reservationController.getOne)
  app.put('/reservation',
    idPolicy.requireIdInBody,
    reservationController.update)
  app.delete('/reservation',
    idPolicy.requireIdInBody,
    reservationController.delete)

  // Invoice api
  const invoiceController = require('./Controllers/InvoiceController')
  const invoicePolicy = require('./Middleware/policies/InvoicePolicy')
  app.post('/invoice',
    invoicePolicy.create,
    invoiceController.create)
  app.post('/invoice/pay',
    idPolicy.requireIdInBody,
    invoiceController.markAsPaid)
  app.get('/invoice/all', invoiceController.getAll)
  app.get('/invoice',
    idPolicy.requireIdInBody,
    invoiceController.getOne)
  app.delete('/invoice',
    idPolicy.requireIdInBody,
    invoiceController.delete)
}
