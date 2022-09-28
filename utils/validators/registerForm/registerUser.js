const {check} = require('express-validator');
const { validateResult } = require('./validateRegisterResult')

const registerFormValidate = [
    check('firstName', 'Please enter a valid name')
        .exists()
        .notEmpty().withMessage('Please enter your name')
        .isAlpha('en-US', {ignore: ' '}).withMessage('Please just enter letters only in your name')
        .isLength({min:3,max:24}).withMessage('Minimun: 3 letters / Max: 24 letters'),

    check('lastName', 'Please enter a valid last name')
        .exists()
        .notEmpty().withMessage('Please enter your last name')
        .isAlpha().withMessage('Please just enter letters in your lastname')
        .isLength({min:3,max:24}).withMessage('Minimun: 3 letters / Max: 24 letters'),

    check('email','Please enter your registered email')
        .exists()
        .notEmpty().withMessage('Please enter the email')
        .isEmail().withMessage('Please enter an email format'),

    check('password','Please enter your password')
        .exists()
        .notEmpty().withMessage('Please enter your password')
        .isLength({min:8}).withMessage('Minimun: 8 characters'),

    (req, res, next) => {
        validateResult(req,res,next)
    }
]

module.exports = {registerFormValidate}