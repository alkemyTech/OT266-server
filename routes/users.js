var express = require('express');
var router = express.Router();

//Import middleware
const { verifyAdmin } = require('../middleware/verifyAdmin');
const { verifyUser } = require('../middleware/verifyUser');
const {activeIdFilter} = require('../middleware/activeIdFilter')

//Import controllers
const {
    getAllUsersGET,
    updateUserPATCH,
    deleteUserById
} = require("../controllers/userController");

/* GET users listing. */
router.get('/', verifyAdmin, getAllUsersGET);


router.patch('/:id', activeIdFilter, verifyUser, updateUserPATCH);
//router.patch('/:id', activeIdFilter, (req,res)=>{res.send('testing')});

//Ruta delete/:id
router.delete('/delete/:id', verifyUser, deleteUserById);

module.exports = router;