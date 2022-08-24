const {check} = require('express-validator');
const { validateResult } = require('./validateUpdateResult')

const updateFormValidate = [
    check('firstName', 'Please enter a valid name')
        .exists()
        .notEmpty().withMessage('Please enter your name')
        .isAlpha().withMessage('Please just enter letters only in your name'),

    check('lastName', 'Please enter a valid last name')
        .exists()
        .notEmpty().withMessage('Please enter your last name')
        .isAlpha().withMessage('Please just enter letters in your lastname'),

    check('email','Please enter your registered email')
        .exists()
        .notEmpty().withMessage('Please enter the email')
        .isEmail().withMessage('Please enter an email format'),

    check('password','Please enter your password')
        .exists()
        .notEmpty().withMessage('Please enter your password'),

    (req, res, next) => {
        validateResult(req,res,next)
    }
]

module.exports = {updateFormValidate}