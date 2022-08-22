var express = require('express');
var router = express.Router();

//Import controllers
const {
    authRegisterPOST,
    authLoginGET,
    authLoginPOST
} = require("../controllers/authController")
//Validators
const {registerFormValidate} = require('../utils/validators/registerForm/registerUser')
const {loginFormValidate} = require("../utils/validators/LoginForm/loginUser")

/* GET home page. */
router.get('/register', function(req, res) {
    res.send('register form GET');
});

router.post('/register',registerFormValidate, authRegisterPOST)

//For login
router.get('/login', authLoginGET)
router.post('/login',loginFormValidate, authLoginPOST)

module.exports = router;