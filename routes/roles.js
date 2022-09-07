const express = require('express');
const Roles = require('../controllers/roleController'); 
const { verifyAdmin } = require('../middleware/verifyAdmin');

const router = express.Router();

/**
 * @swagger
 * /roles:
 *  get:
 *      summary: To see all the Roles in the database
 *      tags: [Roles]
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad Request
 */
router.get('/', verifyAdmin, Roles.listRole);

/**
 * @swagger
 * /roles/new:
 *  post:
 *      summary: To create a role
 *      tags: [Roles]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    required:
 *                      -name
 *                      -description
 *                    properties:
 *                      name:
 *                          type: string
 *                          example: "Admin"
 *                      description:
 *                          type: string
 *                          example: "Usuario administrador"      
 *      responses:
 *          201:
 *              description: roles created successfully
 *          400:
 *              description: Bad Request
 */
router.post('/new', verifyAdmin, Roles.createRole);

/**
 * @swagger
 * /roles/update/{id}:
 *  put:
 *      summary: To update a roles from the database
 *      tags: [Roles]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: roles's id
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
 *                      -description
 *                    properties:
 *                      name:
 *                          type: string
 *                          example: "Admin"
 *                      description:
 *                          type: string
 *                          example: "Usuario administrador"
 *      responses:
 *          200:
 *              Ok
 *          400:
 *              description: Bad Request
 */
router.put('/update/:id', verifyAdmin, Roles.editRole);

/**
 * @swagger
 * /roles/delete/{id}:
 *  delete:
 *      summary: To delete a roles from the database
 *      tags: [Roles]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: roles's id
 *            schema: 
 *              type: number
 *              example: 1
 *      responses:
 *          200:
 *              Ok
 *          400:
 *              description: Bad Request
 */
router.delete('/delete/:id', verifyAdmin, Roles.deleteRole);

module.exports = router;