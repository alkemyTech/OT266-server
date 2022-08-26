var express = require('express');
var router = express.Router();
const { verifyAdmin } = require('../middleware/verifyAdmin');
const { verifyUser } = require('../middleware/verifyUser');

//Import controllers
const {
    getAllUsersGET,
    updateUserPATCH,
    deleteUserById
} = require("../controllers/userController");

/* GET users listing. */
router.get('/', getAllUsersGET);

//Ruta para modificar 
router.patch('/edit/:id', verifyUser, updateUserPATCH);

//Ruta delete/:id
router.delete('/delete/:id', verifyUser, deleteUserById);

module.exports = router;