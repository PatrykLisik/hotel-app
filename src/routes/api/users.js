const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

async function loadUsersCollection () {
  const client = await mongodb.MongoClient.connect('mongodb+srv://hotel_app_admin:aabb123@hotell-app-jqcdo.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
  })
  return client.db('hotell-app').collection('users')
}

// Get users
router.get('/', async (req, res) => {
  const users = await loadUsersCollection()
  res.send(await users.find({}).toArray())
})

// Add users
router.post('/', async (req, res) => {
  const users = await loadUsersCollection()
  await users.insertOne({
    email: req.body.email,
    name: req.body.name,
    password_hash: req.body.password_hash,
    createdAt: new Date()
  })
  res.status(201).send()
})

// Delete users
router.delete('/:id', async (req, res) => {
  const users = await loadUsersCollection()
  await users.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  })
  res.status(200).send()
})

module.exports = router
