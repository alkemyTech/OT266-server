const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    //Get the values for replacing the value in case of an error:
    //from req body
    let { name, content } = req.body;
    //Create an object for sending the info, so the user can see what he sent
    let inputsValuesWithError = { name, content };

    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        let error = err.array();
        return res.json(error)
    }
}

module.exports = { validateResult }