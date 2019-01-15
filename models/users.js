const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    fullName: {type: String, required: true},
    userType: {type: String, required: true},
    phone: {type: String, required: true},
    dateOfBirth: {type: Date, required: true},
    registerDate: {
        type: Date,
        default: new Date()
    },
    numberOfTrips: {type: Number, default: 0},
    // numberOfKilometer: {type: Number, default: 0}, tinh bang google API, tim hieu them sau
    avatar: {type: String},
    isActive: {type: Boolean, default: false}
})

const User = mongoose.model('User', UserSchema);
module.exports = {
    User, UserSchema
}