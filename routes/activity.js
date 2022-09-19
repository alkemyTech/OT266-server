const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/verifyAdmin');

const { activityGet, activityPost, activityUpdate, activityDelete } = require('../controllers/activityController');
const { activityFormValidate } = require('../utils/validators/ActivityForm/createActivity');

/* GET activities listing. */

/**
 * @swagger
 * /activities:
 *  get:
 *      summary: To see all the activities in the database
 *      tags: [Activities]
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad Request
 */
router.get('/', activityGet);

/**
 * @swagger
 * /activities:
 *  post:
 *      summary: To create one activity
 *      tags: [Activities]
 *      security: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    required:
 *                      -name
 *                      -content
 *                      -image
 *                    properties:
 *                      name:
 *                          type: string
 *                          example: "Tutorias"
 *                      content:
 *                          type: string
 *                          example: "Es un programa destinado a jóvenes a partir del tercer año de secundaria, cuyo objetivo es garantizar su permanencia en la escuela y construir un proyecto de vida que da sentido al colegio."
 *                      image:
 *                          type: string
 *                          example: "https://blogs.iadb.org/educacion/wp-content/uploads/sites/22/2022/06/tutorias.remotas.jpg"        
 *      responses:
 *          400:
 *              description: Bad Request
 *          201:
 *              description: Activity created successfully
 *          500:
 *              description: Internal Server Error
 */
router.post('/', verifyAdmin, activityFormValidate, activityPost);

/**
 * @swagger
 * /activities/{id}:
 *  put:
 *      summary: To update one activity from the database
 *      tags: [Activities]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: Activity's id
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
 *                      -content
 *                      -image
 *                    properties:
 *                      name:
 *                          type: string
 *                          example: "Ignacio Martinez"
 *                      content:
 *                          type: string
 *                          example: "Es un programa destinado a jóvenes a partir del tercer año de secundaria, cuyo objetivo es garantizar su permanencia en la escuela y construir un proyecto de vida que da sentido al colegio."
 *                      image:
 *                          type: string
 *                          example: "https://blogs.iadb.org/educacion/wp-content/uploads/sites/22/2022/06/tutorias.remotas.jpg"   
 *      responses:
 *          404:
 *              description: Not Found
 *          400:
 *              description: Bad Request
 *          200:
 *              Ok
 */
router.put('/:id', verifyAdmin, activityUpdate);

/**
 * @swagger
 * /activities/{id}:
 *  delete:
 *      summary: To delete one activity from the database
 *      tags: [Activities]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: Activity's id
 *            schema: 
 *              type: number
 *              example: 1
 *      responses:
 *          404:
 *              description: Not Found
 *          400:
 *              description: Bad Request
 *          200:
 *              description: Ok
 */
router.delete('/:id', verifyAdmin, activityDelete);

module.exports = router;