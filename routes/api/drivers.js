const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer')

const { authorizing } = require('../../middleware/auth')

//load model
const { User } = require('../../models/users')
const { Driver } = require('../../models/driver')
const { Car } = require('../../models/cars')


// config multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        let type = "";
        if (file.mimetype === "" || file.mimetype === "application/octet-stream") type = '.jpg'
        cb(null, new Date().getTime() + '-' + file.originalname + type)

    }
})

const upload = multer({ storage })

// =======PROFILES

// route: /api/users/drivers/create-profile
// desc: create profile for drivers
// access: PUBLIC(driver)
router.post('/create-profile',
    passport.authenticate('jwt', { session: false }),
    authorizing('driver'),
    (req, res) => {
        const { address, passportId, job } = req.body
        Driver.findOne({ userId: req.user.id })
            .then(driver => {
                if (driver) return res.status(400).json({ error: "Profile exists" })

                const newDriver = new Driver({
                    userId: req.user.id,
                    address, passportId, job
                })

                return newDriver.save()
            })
            .then(driver => res.status(200).json(driver))
            .catch(console.log)
    }
)


// route: /api/users/drivers/profile/:userId
// desc: display a driver's info
// access: PUBLIC
router.get('/profile/:userId', (req, res) => {
    const { userId } = req.params
    User.findById(userId)
        .then(user => {
            if (!user) return res.status(400).json({ errors: 'User not found' })
            res.status(200).json(user);
        })
})


// route: /api/users/drivers/update-profile/
// desc: update profile for drivers
// access: PRIVATE(driver)
router.post('/update-profile',
    passport.authenticate('jwt', { session: false }),
    authorizing('driver'),
    (req, res) => {
        const { address, passportId, job } = req.body
        Driver
            .findOne({ userId: req.user.id })
            .then(driver => {
                if (!driver) return res.status(400).json('User not found')

                driver.address = address;
                driver.passportId = passportId;
                driver.job = job;

                return driver.save()
            })
            .then(driver => res.status(200).json(driver))
            .catch(console.log)
    }
)


// route: /api/users/drivers/delete-profile/
// desc: delete profile for drivers
// access: PRIVATE(driver)
router.post('/delete-profile/',
    passport.authenticate('jwt', { session: false }),
    authorizing('driver'),
    (req, res) => {
        Driver
            .findOne({ userId: req.user.id })
            .then(profile => {
                if (!profile) return res.status(400).json({ error: "No profile exists" })

                Driver.findOneAndDelete({ userId: profile.userId })
                    .then(profile => res.status(200).json(profile))
                    .catch(console.log)
            })
            .catch(console.log)
    }
)

// ========= CARS



// route: /api/users/add-car
// desc: add car
// access: Private (driver)
router.post('/add-car',
    passport.authenticate('jwt', { session: false }),
    authorizing('driver'),
    upload.single('carImage'),
    (req, res) => {
        const { brand, model, manufacturingYear, licensePlate, numberOfSeats } = req.body;
        const carImage = req.file.path;

        Driver.findOne({ userId: req.user.id })
            .then(driver => {
                if (!driver) return res.status(404).json({ error: "Driver does not exist" })

                const newCar = new Car({
                    brand, model, manufacturingYear, licensePlate, numberOfSeats, carImage
                })
                driver.carInfo.push(newCar)
                driver.save()
                    .then(driver => res.status(200).json(driver))
                    .catch(console.log)
            })
            .catch(console.log)

    }
)


// route: /api/users/drivers/:driverId/cars
// desc: view cars of a driver
// access: PUBLIC
router.get('/:driverId/cars',
    (req, res) => {
        const { driverId } = req.params

        Driver
            .findById(driverId)
            .then(driver => {
                if (!driver) return res.status(400).json({ error: "Driver does not exist" })

                res.status(200).json(driver.carInfo)
            })
            .catch(console.log)
    }
)



// route: /api/users/drivers/update-car/:carId
// desc: driver updating a car
// access: PRIVATE(drivers)
router.post('/update-car/:carId',
    passport.authenticate('jwt', { session: false }),
    authorizing('driver'),
    upload.single('carImage'),
    (req, res) => {
        const { carId } = req.params;
        const { brand, model, manufacturingYear, licensePlate, numberOfSeats } = req.body;
        const carImage = req.file.path
        Driver
            .findOne({ userId: req.user.id })
            .then(driver => {
                if (!driver) return res.status(400).json({ error: "Driver does not exist" })
                for (let i = 0; i < driver.carInfo.length; i++) {
                    if (driver.carInfo[i].equals(carId)) {
                        const car = driver.carInfo[i];

                        car.brand = brand;
                        car.model = model;
                        car.manufacturingYear = manufacturingYear;
                        car.licensePlate = licensePlate;
                        car.numberOfSeats = numberOfSeats;
                        car.carImage = carImage;

                        return driver.save();
                    }
                }
            })
            .then(car => res.status(200).json(car))
            .catch(console.log)
    }
)


// route: /api/users/drivers/delete-car/:carId
// desc: driver deleting a car
// access: PRIVATE(drivers)
router.post('/delete-car/:carId',
    passport.authenticate('jwt', { session: false }),
    authorizing('driver'),
    (req, res) => {
        const { carId } = req.params
        Driver
            .findOne({ userId: req.user.id })
            .then(driver => {
                if (!driver) return res.status(400).json({ error: "Driver does not exist" })
                for (let i = 0; i < driver.carInfo.length; i++) {
                    if (driver.carInfo[i].equals(carId)) {
                        driver.carInfo.splice(i, 1);
                    }
                }
                return driver.save()
            })
            .then(driver => res.status(200).json(driver))
            .catch(console.log)
    }
)



module.exports = router;