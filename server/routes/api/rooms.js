const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

async function loadRoomsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://hotel_app_admin:aabb123@hotell-app-jqcdo.mongodb.net/test?retryWrites=true', {
        useNewUrlParser: true
    });
    return client.db('hotell-app').collection('rooms');
}

//Get rooms 
router.get("/", async (req, res) => {
    const post = await loadRoomsCollection();
    res.send(await post.find({}).toArray());
});

//Add rooms

//Delete rooms



module.exports = router;