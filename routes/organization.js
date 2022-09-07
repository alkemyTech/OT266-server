const express = require('express');
const { verifyAdmin } = require('../middleware/verifyAdmin');
const { verifyUser } = require('../middleware/verifyUser');

const Organizations = require('../controllers/organizationController'); 

const router = express.Router();

/**
 * @swagger
 * /organization/public:
 *  get:
 *      summary: To see all the categories in the database
 *      tags: [Organization]
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad Request
 */
router.get('/public', Organizations.listOrganizationpublic);

/**
 * @swagger
 * /organization:
 *  get:
 *      summary: To see all the categories in the database
 *      tags: [Organization]
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad Request
 */
router.get('/', verifyUser, Organizations.listOrganization);

/**
 * @swagger
 * /organization/new:
 *  post:
 *      summary: To create a organization
 *      tags: [Organization]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    required:
 *                      -name
 *                      -adress
 *                      -image
 *                      -phone
 *                      -email
 *                      -welcomeText
 *                      -aboutUsText
 *                      -urlFacebook
 *                      -urlLinkedin
 *                      -urlInstagram
 *                    properties:
 *                      name:
 *                          type: string
 *                          example: "Organization 1"
 *                      adress:
 *                          type: string
 *                          example: "123"
 *                      image:
 *                          type: string
 *                          example: ""
 *                      phone:
 *                          type: string
 *                          example: "2148470"
 *                      email:
 *                          type: string
 *                          example: "email.com"
 *                      welcomeText:
 *                          type: string
 *                          example: "welcome"
 *                      aboutUsText:
 *                          type: string
 *                          example: "text"
 *                      urlFacebook:
 *                          type: string
 *                          example: "https://facebook.com/ong"
 *                      urlLinkedin:
 *                          type: string
 *                          example: "https://linkedin.com/ong"
 *                      urlInstagram:
 *                          type: string
 *                          example: "https://instagram.com/ong"        
 *      responses:
 *          201:
 *              description: organization created successfully
 *          400:
 *              description: Bad Request
 */
router.post('/new', verifyAdmin, Organizations.createOrganization);

/**
 * @swagger
 * /organization/update/{id}:
 *  put:
 *      summary: To update an organization from the database
 *      tags: [Organization]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: organization's id
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
 *                      -name
 *                      -adress
 *                      -image
 *                      -phone
 *                      -email
 *                      -welcomeText
 *                      -aboutUsText
 *                      -urlFacebook
 *                      -urlLinkedin
 *                      -urlInstagram
 *                    properties:
 *                      name:
 *                          type: string
 *                          example: "Organization 1"
 *                      adress:
 *                          type: string
 *                          example: "123"
 *                      image:
 *                          type: string
 *                          example: ""
 *                      phone:
 *                          type: string
 *                          example: "2148470"
 *                      email:
 *                          type: string
 *                          example: "email.com"
 *                      welcomeText:
 *                          type: string
 *                          example: "welcome"
 *                      aboutUsText:
 *                          type: string
 *                          example: "text"
 *                      urlFacebook:
 *                          type: string
 *                          example: "https://facebook.com/ong"
 *                      urlLinkedin:
 *                          type: string
 *                          example: "https://linkedin.com/ong"
 *                      urlInstagram:
 *                          type: string
 *                          example: "https://instagram.com/ong"
 *      responses:
 *          200:
 *              Ok
 *          400:
 *              description: Bad Request
 */
router.put('/update/:id', verifyAdmin, Organizations.editOrganization);

/**
 * @swagger
 * /organization/delete/{id}:
 *  delete:
 *      summary: To delete an organization from the database
 *      tags: [Organization]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: organization's id
 *            schema: 
 *              type: number
 *              example: 1
 *      responses:
 *          200:
 *              Ok
 *          400:
 *              description: Bad Request
 */
router.delete('/delete/:id', verifyAdmin, Organizations.deleteOrganization);

module.exports = router;