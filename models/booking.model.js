const mongoose = require('mongoose')
const { STATUS } = require('../utils/constants')

const bookingSchema = new mongoose.Schema({
    theatreId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Theatre'
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Movie'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    timing: {
        type: String,
        required: true
    },
    noOfSeats: {
        type: Number,
        required: true
    },
    totalCost: {
        type: Number
    },
    Status: {
        type: String,
        required: true,
        enum: {
            values: [STATUS.processing,STATUS.cancelled,STATUS.successfull],
            message: "Invalid booking status"
        },
        default: STATUS.processing
    }
},{timestamps: true});

const Booking = new mongoose.model('Booking',bookingSchema)

module.exports = Booking