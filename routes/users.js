var express = require('express');
var router = express.Router();

//Import middleware
const { verifyAdmin } = require('../middleware/verifyAdmin');
const { verifyUser } = require('../middleware/verifyUser');
const { activeIdFilter } = require('../middleware/activeIdFilter')

//Import controllers
const {
    getAllUsersGET,
    updateUserPATCH,
    deleteUserById
} = require("../controllers/userController");

/* GET users listing. */

/**
 * @swagger
 * /users:
 *  get:
 *      summary: To see all the users in the database
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad Request
 */
router.get('/', verifyAdmin, getAllUsersGET);

/**
 * @swagger
 * /users/{id}:
 *  patch:
 *      summary: To update an user from the database
 *      tags: [Users]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: User's id
 *            schema: 
 *              type: number
 *              example: 1
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    required:
 *                      -firstName
 *                      -lastName
 *                      -email
 *                      -password
 *                    properties:
 *                      firstName:
 *                          type: string
 *                          example: "Jimmy"
 *                      lastName:
 *                          type: string
 *                          example: "Arango"
 *                      email:
 *                          type: string
 *                          example: "j@gmail.com"
 *                      password:
 *                          type: string
 *                          example: "123456" 
 *      responses:
 *          200:
 *              Ok
 *          400:
 *              description: Bad Request
 */
router.patch('/:id', activeIdFilter, verifyUser, updateUserPATCH);
//router.patch('/:id', activeIdFilter, (req,res)=>{res.send('testing')});

//Ruta delete/:id

/**
 * @swagger
 * /users/delete/{id}:
 *  delete:
 *      summary: To delete a category from the database
 *      tags: [Categories]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: User's id
 *            schema: 
 *              type: number
 *              example: 1
 *      responses:
 *          200:
 *              Ok
 *          400:
 *              description: Bad Request
 */
router.delete('/delete/:id', verifyUser, deleteUserById);

module.exports = router;