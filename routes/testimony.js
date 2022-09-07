var express = require('express');
var router = express.Router();

const { testimonyGet, 
        testimonyGetOne, 
        testimonyPost, 
        testimonyPut, 
        testimonyDelete} = require('../controllers/testimonyController');
const { verifyAdmin } = require('../middleware/verifyAdmin');

const { testimonyFormValidate } = require('../utils/validators/TestimonyForm/createTestimony');

/* GET testimonies listing. */

/**
 * @swagger
 * /testimony:
 *  get:
 *      summary: To see all the testimonies in the database
 *      tags: [Testimonies]
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad Request
 */
router.get('/', verifyAdmin ,testimonyGet);

/**
 * @swagger
 * /testimony/{id}:
 *  get:
 *      summary: To see one testimony
 *      tags: [Testimonies]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: testimony's id
 *            schema: 
 *              type: number
 *              example: 1
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad Request
 */
router.get('/:id', verifyAdmin, testimonyGetOne);

/**
 * @swagger
 * /testimony:
 *  post:
 *      summary: To create a testimony
 *      tags: [Testimonies]
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
 *                          example: ""
 *                      content:
 *                          type: string
 *                          example: ""
 *                      image:
 *                          type: string
 *                          example: ""        
 *      responses:
 *          201:
 *              description: testimony created successfully
 *          400:
 *              description: Bad Request
 */
router.post('/',[verifyAdmin,testimonyFormValidate], testimonyPost);

/**
 * @swagger
 * /testimony/{id}:
 *  put:
 *      summary: To update a testimony from the database
 *      tags: [Testimonies]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: testimony's id
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
 *                          example: ""
 *                      content:
 *                          type: string
 *                          example: ""
 *                      image:
 *                          type: string
 *                          example: ""
 *      responses:
 *          404:
 *              description: Not Found
 *          200:
 *              Ok
 *          400:
 *              description: Bad Request
 */
router.put('/:id', [verifyAdmin,testimonyFormValidate], testimonyPut);

/**
 * @swagger
 * /testimony/{id}:
 *  delete:
 *      summary: To delete a testimony from the database
 *      tags: [Testimonies]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: testimony's id
 *            schema: 
 *              type: number
 *              example: 1
 *      responses:
 *          404:
 *              description: Not Found
 *          200:
 *              Ok
 *          400:
 *              description: Bad Request
 */
router.delete('/:id', verifyAdmin, testimonyDelete);

module.exports = router;
