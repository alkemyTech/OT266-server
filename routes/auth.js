var express = require('express');
var router = express.Router();

//Import controllers
const {
    authRegisterPOST,
    authLoginGET,
    authLoginPOST
} = require("../controllers/authController")
const {registerFormValidate} = require('../utils/validators/registerForm/registerUser')


/* GET home page. */
router.get('/register', function(req, res) {
    res.send('register form GET');
});

router.post('/register',registerFormValidate, authRegisterPOST)

//For login
router.get('/login', authLoginGET)
router.post('/login', authLoginPOST)

module.exports = router;