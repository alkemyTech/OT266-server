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
 *      summary: To see all the news in the database
 *      tags: [News]
 *      parameters:
 *          - name: page
 *            in: query
 *            required: true
 *            description: Numero de pagina buscada
 *            schema: 
 *              type: number
 *              example: 1
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad Request
 */
router.get('/', getAll);

/**
 * @swagger
 * /news/{id}:
 *  get:
 *      summary: To see one new
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
 *              description: Ok
 *          404:
 *              description: Not Found
 *          400:
 *              description: Bad Request
 */
router.get('/:id', verifyAdmin, getById);

/**
 * @swagger
 * /news/{id}/comments:
 *  get:
 *      summary: To see one new
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
 *              description: Ok
 *          404:
 *              description: Not Found
 *          400:
 *              description: Bad Request
 */
router.get('/:id/comments', getNewsComments);

/**
 * @swagger
 * /news:
 *  post:
 *      summary: To create one new
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
 *              description: New created successfully
 *          400:
 *              description: Bad Request
 */
router.post('/', verifyAdmin, newsFormValidate, createNews);

/**
 * @swagger
 * /news/{id}:
 *  put:
 *      summary: To update one new from the database
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
 *          404:
 *              description: Not Found
 *          200:
 *              Ok
 *          400:
 *              description: Bad Request
 */
router.put('/:id', verifyAdmin, putNews);

/**
 * @swagger
 * /news/{id}:
 *  delete:
 *      summary: To delete one new from the database
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
 *          404:
 *              description: Not Found
 *          200:
 *              Ok
 *          400:
 *              description: Bad Request
 */
router.delete('/:id', verifyAdmin, deleteNews);




module.exports = router;