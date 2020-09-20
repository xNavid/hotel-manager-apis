const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
}, {
    timestamps: true
});

userSchema.virtual('rooms', {
    ref: 'Room',
    unique: true,
    localField: '_id',
    foreignField: 'hotel'
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;