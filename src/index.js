const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const {
  sequelize
} = require('./models')

const config = require('./config/config')

// Middleware
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

require('./routes')(app)

// start server
const port = config.port

sequelize.sync({
  force: false,
  logging: console.log
}).then(() => {
  app.listen(port, () => console.log(`Server started on port ${port}`))
})
