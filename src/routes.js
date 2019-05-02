module.exports = (app) => {
  app.get('/test', (req, res) => {
    res.send({
      message: 'test endpoint Hello World!'
    })
  })

  const userController = require('./Controllers/UserController')
  const userCreationPolicy = require('./policies/UserCreationPolicy')
  app.post('/user',
    userCreationPolicy.register,
    userController.register)
}
