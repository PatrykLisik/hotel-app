const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

// Middleware
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

const rooms = require('./routes/api/rooms')
app.use('/api/rooms', rooms)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
