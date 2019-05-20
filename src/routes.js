module.exports = (app) => {
  app.get('/test', (req, res) => {
    res.send({
      message: 'test endpoint Hello World!'
    })
  })

  const userApi = require('./Routes/users')
  app.use('/', userApi)

  const roomApi = require('./Routes/rooms')
  app.use('/room', roomApi)

  const reservationAPI = require('./Routes/reservations')
  app.use('/reservation', reservationAPI)

  const invoiceAPI = require('./Routes/invoices')
  app.use('/invoice', invoiceAPI)
}
