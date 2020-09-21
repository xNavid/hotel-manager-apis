const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const { sendWelcomeEmail } = require('../emails/account');
const Booking = require('../models/booking');

// Create new user
router.post('/users', async (req, res) => {
    // Create new mongoose user object
    const user = new User(req.body);
    // Save user, create auth token and send back response
    // In case of error catch and return the error
    try {
        await user.save();
        sendWelcomeEmail(user.email, user.name);
        const token = await user.generateAuthToken();
        const message = 'User registration successful.'
        res.status(201).send({ message, user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

// User login
router.post('/users/login', async (req, res) => {
    // Check user credentials and generate the auth token
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        const message = 'Login successful.'
        res.send({ message, user, token });
    } catch (e) {
        res.status(400).send();
    }
})

// Logout from account
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        });
        await req.user.save();
        const message = 'Log out successful.';
        res.send({ message });
    } catch (e) {
        res.status(500).send();
    }
})

// Delete all auth tokens
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        const message = 'Logged out of all sessions.';
        res.send({ message });
    } catch (e) {
        res.status(500).send();
    }
})

// Get your user data
router.get('/users/me', auth, async (req, res) => {
    const message = 'User info retreived.';
    res.send({ message, user: req.user });
})

// Update user data
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    // Only allowed keys can be updated
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {
        // Update each valid given key
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        const message = 'User updated successfully.';
        res.send({ message, user: req.user });
    } catch (e) {
        res.status(400).send(e);
    }
});

// Get user booking data
router.get('/users/me/bookings', auth, async (req, res) => {
    let message;

    // Find user's bookings
    let booking = await Booking.find({ guest: req.user });

    if (booking.length < 1) {
        message = 'No bookings found.';
        return res.status(404).send({ message });
    }

    message = 'Booking info retreived.';
    res.send({ message, booking });
})

module.exports = router;