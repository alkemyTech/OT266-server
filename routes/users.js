var express = require('express');
var router = express.Router();

//Import controllers
const {
  getAllUsers,
  createUser
} = require("../Controllers/userController")

/* GET users listing. */
router.get('/', async function (req, res, next) {
  let userData = await getAllUsers();
  res.send(userData)
});

//Ruta crear
router.get('/crear', async function (req, res) {
  res.send('Form para crear user')
});

//Ruta crear POST
router.post('/crear', async function (req, res) {
  //console.log(req.body)
  let create = await createUser(req.body);
  console.log('Prueba debug create en users.js', create)
  res.send('Form post para crear user')
});


module.exports = router;
