const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    locationFrom: { type: String, required: true },
    locationTo: { type: String, required: true },
    startTime: { type: Date, required: true },
    availableSeats: { type: Number, required: true },
    fee: { type: Number, required: true },
    passengers: [{
        passengersId: { type: String },
        locationGetIn: { type: String },
        locationGetOff: { type: String },
        paymentMethod: { type: String },
        numberOfBookingSeats: {type: Number},
        notes: {type: String}   
    }],
    isFinished: {type: Boolean, required: true, default: false}
})

const Trip = mongoose.model('Trip', TripSchema);
module.exports = {
    TripSchema, Trip
}