const {check} = require('express-validator');
const { validateResult } = require('./validateLoginResult')

const loginFormValidate = [
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

module.exports = {loginFormValidate}