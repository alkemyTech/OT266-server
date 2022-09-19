const express = require('express');
const router = express.Router();

//Import utils
const {commentPost} = require("../utils/validators/CommentPost/commentPost");

//Import middlewares
const { verifyAuth } = require('../middleware/verifyAuth')
const { verifyAdmin } = require('../middleware/verifyAdmin')

//Import handlers
const {
    commentsPost,
    commentsGet,
    commentsPut,
    commentsDelete
} = require('../controllers/commentController')

//Routes

/**
 * @swagger
 * /comments:
 *  get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *         200:
 *             description: Ok
 *         500:
 *             description: Internal Server Error
 */
router.get('/', verifyAdmin, commentsGet);

/**
 * @swagger
 * /comments:
 *  post:
 *      summary: To create a new comment
 *      tags: [Comments]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    required:
 *                      -user_id
 *                      -body
 *                      -news_id
 *                    properties:
 *                      user_id:
 *                          type: number
 *                          example: 1
 *                      body:
 *                          type: string
 *                          example: "Deportes"
 *                      news_id:
 *                          type: number
 *                          example: 1        
 *      responses:
 *          200:
 *              description: Ok
 *          500:
 *              description: Internal Server Error
 */
router.post('/',[verifyAuth,commentPost] , commentsPost)
router.put('/',[verifyAuth,commentsPut] , commentsPut)
router.delete('/',[verifyAuth,commentsDelete] , commentsDelete)

module.exports = router;

