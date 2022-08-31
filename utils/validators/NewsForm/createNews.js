const { check } = require('express-validator');
const { validateResult } = require('./validateNewsResult')

const newsFormValidate = [
    check('name', 'Please use the variable name')
    .exists()
    .notEmpty().withMessage('Empty field, Please enter news name'),

    check('content', 'Please use the variable content')
    .exists()
    .notEmpty().withMessage('Empty field, Please enter a content'),

    check('type', 'Please use the variable news')
    .exists()
    .notEmpty().withMessage('Empty field, Please enter a type'),

    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { newsFormValidate }