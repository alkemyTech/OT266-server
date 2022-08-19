var express = require('express');
var router = express.Router();

//Import controllers
const {
  getAllUsers,
  createUser,
  deleteUserById
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
  res.send('Form post para crear user')
});

//Ruta delete
router.delete('/delete/:id', async function (req, res) {
  let userId = Number(req.params.id);

  let deleteUser = await deleteUserById(userId);

  res.send('Form post para crear user')
});


module.exports = router;
