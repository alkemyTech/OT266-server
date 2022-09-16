const { check } = require('express-validator');
const { validateResult } = require('./validateActivityResult')

const activityFormValidate = [
    check('name', 'Please use the variable name')
    .exists()
    .notEmpty().withMessage('Empty field, Please enter activity name')
    .isString()
    .withMessage('name must be a String'),


    check('content', 'Please use the variable content')
    .exists()
    .notEmpty().withMessage('Empty field, Please enter a content')
    .isString()
    .withMessage('content must be a String'),

    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { activityFormValidate }