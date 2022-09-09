var express = require('express');
var router = express.Router();

//Import controllers
const {
    authRegisterGET,
    authRegisterPOST,
    authLoginGET,
    authLoginPOST,
    authMyInfoGET
} = require("../controllers/authController")
//Validators
const {registerFormValidate} = require('../utils/validators/registerForm/registerUser')
const {loginFormValidate} = require("../utils/validators/LoginForm/loginUser");
const { verifyMe } = require('../middleware/verifyMe');

/* GET home page. */
router.get('/register', authRegisterGET);

/**
 * @swagger
 * /auth/register:
 *  post:
 *      summary: To register a new user
 *      tags: [Auth]
 *      security: []
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
 *          400:
 *              description: Bad Request
 *          201:
 *              description: User registered successfully
 *          500:
 *              description: Internal Server Error
 */
router.post('/register',registerFormValidate, authRegisterPOST)

//For login
router.get('/login', authLoginGET)

/**
 * @swagger
 * /auth/login:
 *  post:
 *      summary: To login inside the application 
 *      tags: [Auth]
 *      security: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    required:
 *                      -email
 *                      -password
 *                    properties:
 *                      email:
 *                          type: string
 *                          example: "j@gmail.com"
 *                      password:
 *                          type: string
 *                          example: "123456"        
 *      responses:
 *          404:
 *              description: Not Found
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad Request
 */
router.post('/login',loginFormValidate, authLoginPOST)

//For getting the user information

/**
 * @swagger
 * /auth/me:
 *  get:
 *      summary: To see only some fields of an user
 *      tags: [Auth]
 *      responses:
 *          200:
 *              description: Ok
 *          500:
 *              description: Internal Server Error
 */
router.get('/me', verifyMe, authMyInfoGET);

module.exports = router;