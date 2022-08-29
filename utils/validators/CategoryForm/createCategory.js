const { check } = require('express-validator');
const { validateResult } = require('./validateCategoryResult')

const categoryFormValidate = [
    check('name', 'Please use the variable name')
    .exists()
    .notEmpty().withMessage('Empty field, Please enter category name'),

    check('name', 'Please enter a string')
    .isString,

    check('description', 'Please use the variable content')
    .exists()
    .notEmpty().withMessage('Empty field, Please enter a description'),

    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { categoryFormValidate }