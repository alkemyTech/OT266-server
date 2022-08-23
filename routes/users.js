var express = require('express');
var router = express.Router();
const { verifyAdmin } = require('../middleware/verifyAdmin');
const { verifyUser } = require('../middleware/verifyUser');

//Import controllers
const {
    getAllUsersGET,
    createUserPOST,
    updateUserPATCH,
    deleteUserById
} = require("../controllers/userController");

/* GET users listing. */
router.get('/', getAllUsersGET);

//Ruta crear
router.get('/create', async function(req, res) {
    res.send('Form para crear user y enviar peticion post a la misma ruta, con POST')
});

//Ruta crear POST
router.post('/create', createUserPOST);

//Ruta para modificar 
router.patch('/edit/:id', verifyUser, updateUserPATCH);

//Ruta delete/:id
router.delete('/delete/:id', verifyAdmin, deleteUserById);

module.exports = router;