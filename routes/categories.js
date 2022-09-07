var express = require('express');
var router = express.Router();

const {categoryGet, 
        categoryGetOne, 
        categoryPost, 
        categoryPut, 
        categoryDelete} = require('../controllers/categoryController');
const { verifyAdmin } = require('../middleware/verifyAdmin');

const { categoryFormValidate } = require('../utils/validators/CategoryForm/createCategory');


/* GET categories listing. */

/**
 * @swagger
 * /category:
 *  get:
 *      summary: To see all the categories in the database
 *      tags: [Categories]
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad Request
 */
router.get('/',categoryGet);

/**
 * @swagger
 * /category/{id}:
 *  get:
 *      summary: To see one category
 *      tags: [Categories]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: Category's id
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
router.get('/:id',verifyAdmin, categoryGetOne);

/**
 * @swagger
 * /category:
 *  post:
 *      summary: To create a category
 *      tags: [Categories]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    required:
 *                      -name
 *                      -description
 *                      -image
 *                    properties:
 *                      name:
 *                          type: string
 *                          example: "Deportes"
 *                      description:
 *                          type: string
 *                          example: "Deportes"
 *                      image:
 *                          type: string
 *                          example: ""        
 *      responses:
 *          201:
 *              description: Category created successfully
 *          400:
 *              description: Bad Request
 */
router.post('/',[verifyAdmin, categoryFormValidate], categoryPost);

/**
 * @swagger
 * /category/{id}:
 *  put:
 *      summary: To update a category from the database
 *      tags: [Categories]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: Category's id
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
 *                      -image
 *                    properties:
 *                      name:
 *                          type: string
 *                          example: "Deportes"
 *                      description:
 *                          type: string
 *                          example: "Deportes"
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
router.put('/:id',[verifyAdmin, categoryFormValidate], categoryPut);

/**
 * @swagger
 * /category/{id}:
 *  delete:
 *      summary: To delete a category from the database
 *      tags: [Categories]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: Category's id
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
router.delete('/:id',verifyAdmin, categoryDelete);

module.exports = router;
