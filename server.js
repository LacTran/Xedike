//  ========== 3rd party packages ==========
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport')

//  ========== my packages ==========
const { mongodbURI } = require('./config/keys')
const { authenticating, authorizing } = require('./middleware/auth')


// ========== connect to database ==========
mongoose.connect(mongodbURI, { useNewUrlParser: true })
    .then(console.log("Connected to MongoDB !"))
    .catch(console.log)






//  ========== server ==========
const app = express();

//  ========== middleware(built-in/3rd party) ==========

// parser
app.use(express.urlencoded({ extended: true })) //dung form-urlencode tren postman
app.use(express.json()) // dung raw -> json tren postman


//passport
app.use(passport.initialize());
require('./config/passport')(passport)

// serve static file
app.use('/uploads', express.static('uploads'));



// ========== routes ==========
app.use('/api/users', require('./routes/api/users'))

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})