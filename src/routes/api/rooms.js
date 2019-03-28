const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

async function loadRoomsCollection () {
  const client = await mongodb.MongoClient.connect('mongodb+srv://hotel_app_admin:aabb123@hotell-app-jqcdo.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
  })
  return client.db('hotell-app').collection('rooms')
}

// Get rooms
router.get('/', async (req, res) => {
  const rooms = await loadRoomsCollection()
  res.send(await rooms.find({}).toArray())
})

// Add rooms
router.post('/', async (req, res) => {
  const rooms = await loadRoomsCollection()
  await rooms.insertOne({
    text: req.body.text,
    createdAt: new Date()
  })
  res.status(201).send()
})

// Delete rooms
router.delete('/:id', async (req, res) => {
  const rooms = await loadRoomsCollection()
  await rooms.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  })
  res.status(200).send()
})

module.exports = router
