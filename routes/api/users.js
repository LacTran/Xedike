const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const passport = require('passport');
const multer = require('multer')

const { authorizing } = require('../../middleware/auth')

//  ========== my packages ==========
const { secretKey } = require('../../config/keys')

//load model
const { User } = require('../../models/users')
const { Driver } = require('../../models/driver')
const { Car } = require('../../models/cars')

// load validate
const { validateRegisterInput } = require('../../validation/validateRegisterInput');

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

// // route: /api/users
// // desc: test first api
// // access: PUBLIC
// router.get('/', (req, res) => {
//     res.status(200).json({ message: "testing api" })
// })


// // route: /api/users/test-private
// // desc: test passport authentication
// // access: PRIVATE
// router.get('/test-private', passport.authenticate('jwt', { session: false }),
//     authorizing('passenger'),
//     (req, res) => {
//         res.status(200).json(req.user)
//     })


//============USER=======///

// route: /api/users/:userId
// desc: get a user's info
// access: PUBLIC
router.get('/:userId', (req, res) => {
    const userId = req.params.userId
    User.findById(userId)
        .then(user => {
            if (!user) return res.status(400).json({ errors: 'User not found' })
            res.status(200).json(user);
        })
})

// route: /api/users/update/:userId
// desc: user updating their own info/profile
// access: PRIVATE(USER,DRIVER)
router.post('/update/:userId',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const userId = req.params.userId
        const { email, password, fullName, userType, phone, dateOfBirth } = req.body
        User.findById(userId)
            .then(user => {
                if (!user) return res.status(400).json({ errors: 'User not found' })


                user.email = email;
                user.password = password;
                user.fullName = fullName;
                user.userType = userType;
                user.phone = phone;
                user.dateOfBirth = dateOfBirth;

                user.save()
                    .then(user => res.status(200).json(user))
                    .catch(console.log)
            })
            .catch(console.log)
    }
)

// route: /api/users/delete/:userId
// desc: user deleting their own info/profile
// access: PRIVATE(USER)
router.post('/delete/',
    passport.authenticate('jwt', { session: false }),
    authorizing('passengger'),
    (req, res) => {
        const userId = req.user.id;
        User.findById(userId)
            .then(user => {
                if (!user) return res.status(400).json({ errrors: "User not found" })

                User.findOneAndRemove(userId)
                    .then(user => res.status(200).json(user))
                    .catch(console.log)
            })
            .catch(console.log)
    }
)

// route: /api/users/register
// desc: register an user
// access: PUBLIC
router.post('/register', (req, res) => {
    // console.log(req.body)
    // res.status(200).send(req.body)
    const { email, password, fullName, userType, phone, dateOfBirth } = req.body

    const { errors, isValid } = validateRegisterInput(req.body);
    // check validation
    if (!isValid) return res.status(400).json(errors)


    User.findOne({ $or: [{ email }, { phone }] })
        .then(user => {
            if (user) {
                if (user.email === email) errors.email = "Email already Exist"
                if (user.phone === phone) errors.phone = "Phone already Exist"

                return res.status(400).json(errors)
            }

            const newUser = new User({
                email, password, fullName, userType, phone, dateOfBirth
            })

            bcrypt.genSalt(10, (err, salt) => {
                if (err) return res.status(400).json(err);
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) return res.status(400).json(err);
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            return res.status(200).json(user)
                        })
                        .catch(console.log)
                })
            })

        })
        .catch(console.log)
})


// route: /api/users/login
// desc: login
// access: PUBLIC
router.post('/login', (req, res) => {
    const { email, password } = req.body
    User
        .findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ error: "Email or password is incorrect" }) // => more secure than 404 & email does not exist

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) res.status(400).json({ error: "Email or password is incorrect" }) // => more secure than 404 & email does not exist
                    // if isMatch = true => create payload for JWT
                    const payload = {
                        id: user._id,
                        email: user.email,
                        fullName: user.fullName,
                        userType: user.userType,
                        avatar: user.avatar
                    }
                    // create JWT
                    jwt.sign(
                        payload,
                        secretKey, //secretKey,
                        { expiresIn: '1h' }, //expire in 1hour
                        (err, token) => {
                            res.status(200).json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        }
                    )
                })
                .catch(console.log)
        })
        .catch(console.log)
})

// route: /api/users/upload-avatar
// desc: upload avatar
// access: PUBLIC(admin, driver, passenger)
router.post('/upload-avatar',
    passport.authenticate('jwt', { session: false }),
    upload.single('avatar'),
    (req, res) => {
        User.findById(req.user.id)
            .then(user => {
                user.avatar = req.file.path
                return user.save()
            })
            .then(user => res.status(200).json(user))
            .catch(console.log)
    }
)

// route: /api/users/drivers/rate/:driverId
// desc: rate driver (1-5)
// access: private(passengers)
router.post('/rate/:driverId',
    passport.authenticate('jwt', { session: false }),
    authorizing('passenger'),
    (req, res) => {
        const driverId = req.params.driverId;
        const { rating } = req.body
        Driver.findById(driverId)
            .then(driver => {
                if (!driver) return res.status(404).json({ error: "Driver not found" })

                driver.passengerRates.push(rating)
                driver.save()
                    .then(driver => res.status(200).json(driver))
                    .catch(console.log)
            })
            .catch(console.log)
    }
)


module.exports = router;