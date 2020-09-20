const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true,
});

hotelSchema.virtual('rooms', {
    ref: 'Room',
    unique: true,
    localField: '_id',
    foreignField: 'hotel'
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;