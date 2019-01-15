const mongoose = require('mongoose')

const DriverSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    address: { type: String, required: true },
    passportId: { type: String, required: true },
    // carInfo: cac ban tu lam
    passengerRates: {
        type: [Number],
        mix: 1,
        max: 5
    }
})

const Driver = mongoose.model('Driver', DriverSchema)
module.exports = {
    DriverSchema, Driver
}