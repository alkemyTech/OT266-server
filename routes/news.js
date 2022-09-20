var express = require('express');
var router = express.Router();

const { getAll, getById, createNews, putNews, deleteNews, getNewsComments } = require('../controllers/newsController');
const { verifyAdmin } = require('../middleware/verifyAdmin');
const { newsFormValidate } = require('../utils/validators/NewsForm/createNews');

/* GET news listing. */

/**
 * @swagger
 * /news:
 *  get:
 *      summary: Endpoint to see all the news in the database
 *      tags: [News]
 *      parameters:
 *          - name: page
 *            in: query
 *            required: true
 *            description: Number of page
 *            schema: 
 *              type: number
 *              example: 1
 *          - name: size
 *            in: query
 *            required: false
 *            description: Length of the list
 *            schema: 
 *              type: number
 *              example: 10
 *      responses:
 *          200:
 *              description: Ok - Return a list of news. Default length 10, size query determinates length.
 *          400:
 *              description: Bad Request
 */
router.get('/', getAll);

/**
 * @swagger
 * /news/{id}:
 *  get:
 *      summary: Endpoint to display just one news information (News selected by ID via params)
 *      tags: [News]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: New's id
 *            schema: 
 *              type: number
 *              example: 1
 *      responses:
 *          200:
 *              description: Ok - Returns information of selected news
 *          404:
 *              description: Could not found news via the ID
 *          400:
 *              description: Bad Request
 */
router.get('/:id', verifyAdmin, getById);

/**
 * @swagger
 * /news/{id}/comments:
 *  get:
 *      summary: Endpoint to get all comments related to a news (News selected by ID via params)
 *      tags: [News]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: New's id
 *            schema: 
 *              type: number
 *              example: 1
 *      responses:
 *          200:
 *              description: Ok - Returns all comments of the selected news
 *          404:
 *              description: Could not found news via the ID
 *          400:
 *              description: Bad Request
 */
router.get('/:id/comments', getNewsComments);

/**
 * @swagger
 * /news:
 *  post:
 *      summary: Endpoint to create a new News
 *      tags: [News]
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
 *                      -type
 *                    properties:
 *                      name:
 *                          type: string
 *                          example: "tituaslo"
 *                      content:
 *                          type: string
 *                          example: "David Rush, de Idaho, Estados Unidos, acaba de batir el Récord Mundial Guinness de lanzamiento de panchos. ¿De cuánto fue la distancia? Bastante impresionante: 51 metros, más de media cancha de fútbol, pulverizando el récord anterior de 47,5 metros."
 *                      image:
 *                          type: string
 *                          example: "https://i0.wp.com/www.periodismo.com/wp-content/subid/Record-Mundial-de-lanzamiento-de-panchos.jpg?fit=1920%2C1080&ssl=1"
 *                      type:
 *                          type: string
 *                          example: "news"    
 *      responses:
 *          201:
 *              description: OK - Successfully created - Returns the new created news
 *          400:
 *              description: Bad Request
 */
router.post('/', verifyAdmin, newsFormValidate, createNews);

/**
 * @swagger
 * /news/{id}:
 *  put:
 *      summary: Endpoint to update one news information(News selected by ID via params) 
 *      tags: [News]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: new's id
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
 *                      -type
 *                    properties:
 *                      name:
 *                          type: string
 *                          example: "tituaslo"
 *                      content:
 *                          type: string
 *                          example: "David Rush, de Idaho, Estados Unidos, acaba de batir el Récord Mundial Guinness de lanzamiento de panchos. ¿De cuánto fue la distancia? Bastante impresionante: 51 metros, más de media cancha de fútbol, pulverizando el récord anterior de 47,5 metros."
 *                      image:
 *                          type: string
 *                          example: "https://i0.wp.com/www.periodismo.com/wp-content/subid/Record-Mundial-de-lanzamiento-de-panchos.jpg?fit=1920%2C1080&ssl=1"
 *                      type:
 *                          type: string
 *                          example: "news" 
 *      responses:
 *          200:
 *               OK - Successfully updated - Returns the updated news
 *          404:
 *              description: Could not found news via the ID
 *          400:
 *              description: Bad Request
 */
router.put('/:id', verifyAdmin, putNews);

/**
 * @swagger
 * /news/{id}:
 *  delete:
 *      summary: Endpoint to soft-delete one news from the database (News selected by ID via params)
 *      tags: [News]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: new's id
 *            schema: 
 *              type: number
 *              example: 1
 *      responses:
 *          200:
 *              OK - Successfully soft-deleted
 *          404:
 *              description: Could not found news via the ID
 *          400:
 *              description: Bad Request
 */
router.delete('/:id', verifyAdmin, deleteNews);




module.exports = router;