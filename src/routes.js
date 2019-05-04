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
    userController.register)

  app.post('/login',
    userController.login)

  // Room api
  const roomController = require('./Controllers/RoomController')

  app.get('/room',
    roomController.getOne)

  app.get('/room/all',
    roomController.getAll)

  app.post('/room', roomController.createOne)
}
