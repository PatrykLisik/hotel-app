module.exports = (app) => {
  app.get('/test', (req, res) => {
    res.send({
      message: 'test endpoint Hello World!'
    })
  })

  // User api
  const userController = require('./Controllers/UserController')
  const userCreationPolicy = require('./policies/UserCreationPolicy')

  app.post('/user',
    userCreationPolicy.register,
    userController.register
  )

  app.post('/login',
    userController.login
  )

  app.put('/user',
    userController.update
  )

  app.delete('/user',
    userController.delete
  )

  // Room api
  const roomController = require('./Controllers/RoomController')

  app.get('/room',
    roomController.getOne
  )

  app.get('/room/all',
    roomController.getAll
  )

  app.post('/room',
    roomController.createOne
  )

  app.put('/room',
    roomController.update
  )

  app.delete('/room',
    roomController.delete
  )

  // Reservation api
  const reservationController = require('./Controllers/ReservationController')
  app.post('/reservation',
    reservationController.createOne)

  app.get('/reservation/all',
    reservationController.getAll
  )

  app.get('/reservation',
    reservationController.getOne
  )

  app.put('/reservation',
    reservationController.update
  )

  app.delete('/reservation',
    reservationController.delete
  )

  // Invoice api
  const invoiceController = require('./Controllers/InvoiceController')
  app.post('/invoice', invoiceController.create)
}
