const {validationResult} = require('express-validator');

const validateResult = (req,res,next) => {
    //Get the values for replacing the value in case of an error:
        //from req body
        let { firstName, lastName, email, password } = req.body;
        //Create an object for sending the info, so the user can see what he sent
        let inputsValuesWithError= {firstName, lastName, email, password};

    try {
        validationResult(req).throw()
        return next()
    } catch (error) {
        let errores = error.array();
        console.log(errores);
        res.send(errores)
    }
}

module.exports = {validateResult}