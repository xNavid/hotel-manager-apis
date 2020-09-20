const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const Room = require('../models/room');
const Booking = require('../models/booking');

// Create a new room record (for testing purposes)
router.post('/rooms', auth, async (req, res) => {
    const room = new Room (req.body);
    let message;
    try {
        await room.save();
        res.status(201).send({ message, room });
    } catch (e) {
        res.status(400).send(e);
    }
});

// Get a single room by id
router.get('/rooms/:id', auth, async (req, res) => {
    const _id = req.params.id;
    let message;
    try {
        const room = await Room.findOne({ _id });
        if (!room) {
            message = 'Room doesnt exist';
            res.status(404).send({ message });
        }
        message = 'Room found successfully.';
        res.send({ message, room });
    } catch (e) {
        res.status(500).send(e);
    }
});

// Find all rooms
router.get('/rooms', auth, async (req, res) => {
    let query = {};
    if (req.query.number) {
        query.number = req.query.number;
    }
    if (req.query.beds) {
        query.beds = req.query.beds;
    }
    if (req.query.level) {
        query.level = req.query.level;
    }

    let message;
    try {
        const rooms = await Room.find(query);
        message = 'Rooms found successfully.';
        res.send({ message, rooms });
    } catch (e) {
        message = 'Internal server error;'
        res.status(500).send(e);
    }
});

// Book a room
router.post('/rooms/:id/book', auth, async (req, res) => {
    const _id = req.params.id;
    let message;
    try {
        const room = await Room.findOne({ _id });
        if (!room) {
            message = 'Room doesnt exist';
            res.status(404).send({ message });
        }

        // Check if room is already booked
        let booking = await Booking.find({ room: room._id, to: { $gte: req.body.to }, from: { $lt: req.body.from }, active: true });

        // Room is already booked 
        if (booking.length > 0) {
            message = 'Room is already booked.'
            return res.send({ message })
        }
        

        // Create a new booking
        booking = new Booking({
            guest: req.user,
            from: req.body.from,
            to: req.body.to,
            room: req.params.id,
        });

        // Calculte cost by getting the dates difference and multiply by rate
        booking.cost = room.rate * Math.ceil(Math.abs(booking.to - booking.from) / (1000 * 60 * 60 * 24));

        await booking.save();

        message = 'Room booked successfully.';
        res.send({ message, booking });
    } catch (e) {
        res.status(500).send(e);
    }
});

// Checkout of a room using your booking id
router.post('/rooms/:id/checkout', auth, async (req, res) => {
    const _id = req.params.id;
    let message;
    try {
        const room = await Room.findOne({ _id });
        if (!room) {
            message = 'Room doesnt exist';
            res.status(404).send({ message });
        }

        const booking = await Booking.findOne({ _id: req.body.bookingId });

        if (!booking) {
            message = 'Booking not found';
            return res.status(404).send({ message });
        } 
        // Set the booking active to false (no longer in room)
        booking.active = false;

        await booking.save();

        message = 'Checkout successful..';
        res.send({ message, booking });
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;