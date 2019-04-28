module.exports = (app) => {
  app.get('/test', (req, res) => {
    res.send({
      message: 'test endpoint Hello World!'
    })
  })
}
