const mongoose = require('mongoose');
const validator = require('validator');

const roomSchema = new mongoose.Schema({
    number: {
        type: Number, 
        required: true,
        unique: true,
        uppercase: true,
        validate(value) { // Make sure room number is not zero
            if (value < 1) {
                throw new Error('Room number invalid.');
            }
        }
    },
    level: { 
        type: Number, 
        required: true,
        uppercase: true,
        validate(value) { // Make sure room numbre is not empty
            if (value < 1) {
                throw new Error('Room number invalid.');
            }
        }
    },
    beds: {
        type: Number,
        required: true,
    }, 
    // Cost per night basically
    rate: {
        type: Number,
        required: true,
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        validate(value) { // Make sure room numbre is not empty
            if (!validator.isMongoId(value.toString())) {
                throw new Error('Hotel is invalid.');
            }
        },
        unique: false,
    },

}, {
    timestamps: true
});


const Room = mongoose.model('Room', roomSchema);

module.exports = Room;