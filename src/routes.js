module.exports = (app) => {
  app.get('/test', (req, res) => {
    res.send({
      message: 'test endpoint Hello World!'
    })
  })

  const idPolicy = require('./Middleware/IdRequire.js')
  const authorization = require('./Middleware/Authorization/AuthorizeRole')
  const RolesENUM = require('./Middleware/Authorization/Roles')

  const userApi = require('./Routes/users')
  app.use('/', userApi)

  const roomApi = require('./Routes/rooms')
  app.use('/room', roomApi)

  // Reservation api
  const reservationController = require('./Controllers/ReservationController')
  app.post('/reservation',
    authorization.authorizeRoleFactoryMethod(RolesENUM.User),
    reservationController.createOne)

  app.get('/reservation/all',
    authorization.authorizeRoleFactoryMethod(RolesENUM.Manager),
    reservationController.getAll)

  app.get('/reservation',
    idPolicy.requireIdInBody,
    authorization.authorizeRoleFactoryMethod(RolesENUM.User),
    reservationController.getOne)

  app.put('/reservation',
    idPolicy.requireIdInBody,
    authorization.authorizeRoleFactoryMethod(RolesENUM.User),
    reservationController.update)

  app.delete('/reservation',
    idPolicy.requireIdInBody,
    authorization.authorizeRoleFactoryMethod(RolesENUM.User),
    reservationController.delete)

  // Invoice api
  const invoiceController = require('./Controllers/InvoiceController')
  const invoicePolicy = require('./Middleware/policies/InvoicePolicy')

  app.post('/invoice',
    invoicePolicy.create,
    authorization.authorizeRoleFactoryMethod(RolesENUM.User),
    invoiceController.create)

  app.post('/invoice/pay',
    idPolicy.requireIdInBody,
    authorization.authorizeRoleFactoryMethod(RolesENUM.User),
    invoiceController.markAsPaid)

  app.get('/invoice/all',
    authorization.authorizeRoleFactoryMethod(RolesENUM.Manager),
    invoiceController.getAll)

  app.get('/invoice',
    idPolicy.requireIdInBody,
    authorization.authorizeRoleFactoryMethod(RolesENUM.User),
    invoiceController.getOne)

  app.delete('/invoice',
    idPolicy.requireIdInBody,
    authorization.authorizeRoleFactoryMethod(RolesENUM.Admin),
    invoiceController.delete)
}
