const express = require('express');
const router = express.Router();

//Controllers
const {
    slidesGET,
    slidesPOST,
    slideInfoById,
    slideUpdateById,
    deleteUserById
} = require('../controllers/slidesController');

//Middlewares
const { verifyAdmin } = require('../middleware/verifyAdmin');
const {checkSlideExistsById} = require('../middleware/checkSlideExistsById')

//Routes

/**
 * @swagger
 * /slides:
 *  get:
 *      summary: To see all the slides in the database
 *      tags: [Slides]
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad Request
 */
router.get('/', verifyAdmin, slidesGET)

/**
 * @swagger
 * /slides:
 *  post:
 *      summary: To create one slide
 *      tags: [Slides]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    required:
 *                      -imageUrl
 *                      -text
 *                      -order
 *                      -organizationId
 *                    properties:
 *                      imageUrl:
 *                          type: string
 *                          example: "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png"
 *                      text:
 *                          type: string
 *                          example: "Tercer Slide"
 *                      order:
 *                          type: number
 *                          example: 3
 *                      organizationId:
 *                          type: number
 *                          example: 1   
 *      responses:
 *          201:
 *              description: slides created successfully
 *          400:
 *              description: Bad Request
 */
router.post('/', verifyAdmin, slidesPOST)

/**
 * @swagger
 * /slides/{id}:
 *  get:
 *      summary: To see one slide
 *      tags: [Slides]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: slide's id
 *            schema: 
 *              type: number
 *              example: 1
 *      responses:
 *          404:
 *              description: Not Found
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad Request
 */
router.get('/:id', verifyAdmin, checkSlideExistsById, slideInfoById)

/**
 * @swagger
 * /slides/{id}:
 *  put:
 *      summary: To update one slide from the database
 *      tags: [Slides]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: slide's id
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
 *                      -imageUrl
 *                      -text
 *                      -order
 *                      -organizationId
 *                    properties:
 *                      imageUrl:
 *                          type: string
 *                          example: "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png"
 *                      text:
 *                          type: string
 *                          example: "Tercer Slide"
 *                      order:
 *                          type: number
 *                          example: 3
 *                      organizationId:
 *                          type: number
 *                          example: 1
 *      responses:
 *          200:
 *              Ok
 *          400:
 *              description: Bad Request
 */
router.put('/:id', verifyAdmin, checkSlideExistsById, slideUpdateById)

/**
 * @swagger
 * /slides/{id}:
 *  delete:
 *      summary: To delete one slide from the database
 *      tags: [Slides]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: slide's id
 *            schema: 
 *              type: number
 *              example: 1
 *      responses:
 *          200:
 *              Ok
 *          400:
 *              description: Bad Request
 */
router.delete('/:id', verifyAdmin, checkSlideExistsById, deleteUserById)

module.exports = router