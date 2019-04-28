const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

// Middleware
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

// start server
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
