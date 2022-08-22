var express = require('express');
var router = express.Router();

//Import controllers
const {
    authRegisterPOST
} = require("../controllers/authController")
const {registerFormValidate} = require('../utils/validators/registerForm/registerUser')


/* GET home page. */
router.get('/register', function(req, res) {
    res.send('register form GET');
});

router.post('/register',registerFormValidate, authRegisterPOST)


module.exports = router;