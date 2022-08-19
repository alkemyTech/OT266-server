var express = require('express');
var router = express.Router();

//Import controllers
const {
  getAllUsers
} = require("../Controllers/userController")

/* GET users listing. */
router.get('/', async function (req, res, next) {
  let userData = await getAllUsers();
  res.send(userData)
});

module.exports = router;
