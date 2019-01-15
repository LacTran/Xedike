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

// route: /api/users
// desc: test first api
// access: PUBLIC
router.get('/', (req, res) => {
    res.status(200).json({ message: "testing api" })
})


// route: /api/users/register
// desc: register an user
// access: PUBLIC
router.post('/register', (req, res) => {
    // console.log(req.body)
    // res.status(200).send(req.body)
    const { email, password, fullName, userType, phone, dateOfBirth } = req.body

    User.findOne({ $or: [{ email }, { phone }] })
        .then(user => {
            if (user) return res.status(400).json({ error: "Email or Phone exist" })

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
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(404).json({ error: 'Email does not exist' })
            // if(!user) return res.status(400).json({error: 'Email and password not match'}) // thuc te

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) res.status(400).json({ error: "Password is incorrect" })

                    const payload = {
                        _id: user._id,
                        email: user.email,
                        fullName: user.fullName,
                        userType: user.userType
                    }

                    jwt.sign(
                        payload,
                        secretKey,
                        { expiresIn: '1h' },
                        (err, token) => {
                            res.status(200).json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        }
                    )
                })
        })
})


// route: /api/users/test-private
// desc: test passport authentication
// access: PRIVATE
router.get('/test-private', passport.authenticate('jwt', { session: false }),
    authorizing('user'),
    (req, res) => {
        res.status(200).json(req.user)
    })

// route: /api/users/upload-avatar
// desc: upload avatar
// access: PUBLIC(admin, driver, passenger)
router.post('/upload-avatar',
    passport.authenticate('jwt', { session: false }),
    upload.single('avatar'),
    (req, res) => {
        User.findById(req.user._id)
            .then(user => {
                user.avatar = req.file.path
                return user.save()
            })
            .then(user => res.status(200).json(user))
            .catch(console.log)
    }
)

// route: /api/users/upload-avatar
// desc: upload avatar
// access: PUBLIC(admin, driver, passenger)
router.post('/drivers/create-profile',
    passport.authenticate('jwt', { session: false }),
    authorizing('driver'),
    (req, res) => {
        const { address, passportId, job } = req.body
        Driver.findOne({ userId: req.user._id })
            .then(driver => {
                if(driver) return res.status(400).json({error: "Profile exists"})

                const newDriver = new Driver({
                    userId: req.user._id,
                    address, passportId, job
                })

                return newDriver.save()
            })
            .then(driver => res.status(200).json(driver))
            .catch(console.log)
    }
)

module.exports = router;