const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const errorHandler = require('./_helpers/error-handler')
const morgan = require('morgan')

// Middleware
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

// api routes
app.use('/users', require('./users/users.controller'))

const rooms = require('./routes/api/rooms')
app.use('/api/rooms', rooms)

// global error handler
app.use(errorHandler)

// start server
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
