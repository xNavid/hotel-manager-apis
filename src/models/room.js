const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: false
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true,
    },
    guest: {
        type: mongoose.Schema.Types.ObjectId,
        default: null, 
    },

}, {
    timestamps: true
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;