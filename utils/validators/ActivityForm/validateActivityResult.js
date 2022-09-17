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
<<<<<<< HEAD
        console.log(error);
        return res.status(400).json(error)
=======
        return res.json(error)
>>>>>>> d54d219c0efee2fe6eb2f04340abd1c247e44664
    }
}

module.exports = { validateResult }