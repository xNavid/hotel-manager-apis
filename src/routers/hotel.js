const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const Hotel = require('../models/hotel');

// Find all rooms
router.get('/hotels', auth, async (req, res) => {

    let message;
    try {
        const hotels = await Hotel.find();
        message = 'Hotels found successfully.';
        res.send({ message, hotels });
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;