const { check } = require('express-validator');
const { validateResult } = require('./validateContactResult')

const contactFormValidate = [
    check('name', 'Please enter a valid name')
    .exists()
    .notEmpty().withMessage('Please enter your name')
    .isAlpha().withMessage('Please just enter letters only in your name'),

    check('email', 'Please enter an email')
    .exists()
    .notEmpty().withMessage('Please enter the email')
    .isEmail().withMessage('Please enter an email format'),

    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { contactFormValidate }