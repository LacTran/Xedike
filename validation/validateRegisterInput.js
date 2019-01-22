// validator
// express-validator
// Joi
// lodash
// validation

const validator = require('validator')

const validateRegisterInput = (data) => {
    let errors = {

    }
    // email
    if (validator.isEmpty(data.email)) {
        errors.email = "Email is required"
    }

    if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid"
    }

    // password
    if (validator.isEmpty(data.password)) {
        errors.password = "Password is required"
    }

    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be betweeen 6 and 30 characters"
    }

    // if (!validator.isEmpty(data.password2)) {
    //     errors.password = "Please confirm password!"
    // }

    // if (!validator.equals(data.password, data.password2)) {
    //     errors.password = "Password must match!"
    // }

    // full name

    if (validator.isEmpty(data.fullName)) {
        errors.fullName = "Full name is required"
    }

    if (!validator.isLength(data.fullName, { min: 6, max: 30 })) {
        errors.fullName = "Full name must be between 6 and 30 characters"
    }

    // userType

    if (!validator.equals(data.userType, 'passenger') &&
        !validator.equals(data.userType, 'driver')) {
        errors.userType = "Choose your user type"
    }

    // phone
    if (validator.isEmpty(data.phone)) {
        errors.phone = "Phone is required"
    }

    return {
        errors,
        isValid: Object.keys(errors).length > 0 ? false : true
    };

}

module.exports = {
    validateRegisterInput
}