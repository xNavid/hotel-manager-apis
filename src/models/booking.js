const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    guest: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    from: {
        type: Date,
        required: true,
    },
    to: {
        type: Date,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true
});


const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;