var express = require('express');
var router = express.Router();

//Import controllers
const {
  getAllUsers,
  createUser,
  updateUserPATCH,
  deleteUserById
} = require("../Controllers/userController")

/* GET users listing. */
router.get('/', async function (req, res, next) {
  let userData = await getAllUsers();
  res.send(userData)
});

//Ruta crear
router.get('/create', async function (req, res) {
  res.send('Form para crear user y enviar peticion post a la misma ruta, con POST')
});

//Ruta crear POST
router.post('/create', async function (req, res) {
  let create = await createUser(req.body);
  res.send('Usuario creado')
});

//Ruta para modificar 
router.patch('/edit/:id', updateUserPATCH)

//Ruta delete/:id
router.delete('/delete/:id', async function (req, res) {
  let userId = Number(req.params.id);

  let deleteUser = await deleteUserById(userId);

  res.send('Form post para crear user')
});

module.exports = router;