module.exports = (app) => {
  app.get('/test', (req, res) => {
    res.send({
      message: 'test endpoint Hello World!'
    })
  })
  const idPolicy = require('./policies/IdRequire.js')
  // User api
  const userController = require('./Controllers/UserController')
  const userCreationPolicy = require('./policies/UserPolicy')

  app.post('/user',
    userCreationPolicy.register,
    userController.register
  )
  app.post('/login', userController.login)
  app.put('/user',
    idPolicy.requireIdInBody,
    userCreationPolicy.update,
    userController.update)
  app.delete('/user',
    idPolicy.requireIdInBody,
    userController.delete)
  app.get('/user/all', userController.getAll)
  app.get('/user', userController.getOne)

  // Room api
  const roomController = require('./Controllers/RoomController')
  const roomPolicy = require('./policies/RoomPolicy')

  app.get('/room',
    idPolicy.requireIdInBody,
    roomController.getOne)
  app.get('/room/all', roomController.getAll)
  app.post('/room',
    roomPolicy.create,
    roomController.createOne)
  app.put('/room',
    idPolicy.requireIdInBody,
    roomPolicy.update,
    roomController.update)
  app.delete('/room',
    idPolicy.requireIdInBody,
    roomController.delete)

  // Reservation api
  const reservationController = require('./Controllers/ReservationController')
  app.post('/reservation', reservationController.createOne)
  app.get('/reservation/all', reservationController.getAll)
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
  const invoicePolicy = require('./policies/InvoicePolicy')
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
