const express = require('express');
const router = express.Router();
const passport = require('passport');

//  ========== my packages ==========
const { authorizing } = require('../../middleware/auth')



//load model
const { User } = require('../../models/users')
const { Trip } = require('../../models/trips')
const { Driver } = require('../../models/driver')



// route: /api/trips
// desc: view all trips
// access: PUBLIC
router.get('/', (req, res) => {
    Trip
        .find()
        .then(trips => {
            res.status(200).json(trips)
        })
        .catch(console.log)
})

// route: /api/trips/:tripId
// desc: view one specific trip
// access: PUBLIC
router.get('/:tripId', (req, res) => {
    const { tripId } = req.params
    Trip
        .findById(tripId)
        .then(trip => {
            res.status(200).json(trip)
        })
        .catch(console.log)
})

// route: /api/trips/create-trip
// desc: create new trip
// access: private(drivers)
router.post('/create-trip',
    passport.authenticate('jwt', { session: false }),
    authorizing('driver'),
    (req, res) => {
        const { locationFrom, locationTo, startTime, availableSeats, fee } = req.body;
        User.findById(req.user.id)
            .then(user => {
                if (!user) return res.status(404).json({ error: 'User not found' })
                const newTrip = new Trip({
                    userId: req.user.id,
                    locationFrom, locationTo, startTime, availableSeats, fee
                })

                newTrip.save()
                    .then(trip => res.status(200).json(trip))
                    .catch(console.log)
            })
            .catch(console.log)
    }
)

// route: /api/trips/book-trip/:tripId
// desc: book new trip
// access: private(passengers)
router.post('/book-trip/:tripId',
    passport.authenticate('jwt', { session: false }),
    authorizing('passenger'),
    (req, res) => {
        const tripId = req.params.tripId;
        const userId = req.user.id;
        const { locationGetIn, locationGetOff, paymentMethod, numberOfBookingSeats, notes } = req.body
        Trip.findById(tripId)
            .then(trip => {
                if (!trip) return res.status(404).json({ error: 'Trip not found' });
                if (numberOfBookingSeats > trip.availableSeats) return res.status(400).json({ error: 'Not enough seat' });
                trip.availableSeats -= numberOfBookingSeats;
                const newPassenger = {
                    _id: userId,
                    locationGetIn, locationGetOff, paymentMethod, numberOfBookingSeats, notes
                }
                trip.passengers.push(newPassenger);
                trip.save()
                    .then(trip => res.status(200).json(trip))
                    .catch(console.log)
            })
            .catch(console.log)
    }
)

// route: /api/trips/cancel-trip/:tripId
// desc: cancel a booked trip
// access: private(passengers)
router.post('/cancel-trip/:tripId',
    passport.authenticate('jwt', { session: false }),
    authorizing('passenger'),
    (req, res) => {
        const { tripId } = req.params
        const userId = req.user.id;
        Trip
            .findById(tripId)
            .then(trip => {
                if (!trip) return res.status(400).json({ error: "Trip does not exist" })
                for (let i = 0; i < trip.passengers.length; i++) {
                    if (trip.passengers[i].equals(userId)) {
                        trip.passengers.splice(i, 1);
                    }
                }
                return trip.save();
            })
            .then(trip => res.status(200).json(trip))
            .catch(console.log)
    }
)

// route: /api/trips/finish-trip/:tripId
// desc: finish trip
// access: private(drivers)
router.get('/finish-trip/:tripId',
    passport.authenticate('jwt', { session: false }),
    authorizing('driver'),
    (req, res) => {
        const tripId = req.params.tripId;
        Trip.findById(tripId)
            .then(trip => {
                if (!trip) return res.status(404).json({ error: "Trip not found" })
                trip.isFinished = true;
                trip.save()
                    .then(trip => res.status(200).json(trip))
                    .catch(console.log)
            })
            .catch(console.log)
    }
)


module.exports = router;
