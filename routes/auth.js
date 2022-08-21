var express = require('express');
var router = express.Router();

//Import controllers
const {
    authRegisterPOST
} = require("../controllers/authController")

/* GET home page. */
router.get('/register', function(req, res) {
    res.send('register form GET');
});

router.post('/register', authRegisterPOST)


module.exports = router;