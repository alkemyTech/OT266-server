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

router.get('/', verifyAdmin, commentsGet);
router.post('/',[verifyAuth,commentPost] , commentsPost)
router.put('/',[verifyAuth,commentsPut] , commentsPut)
router.delete('/',[verifyAuth,commentsDelete] , commentsDelete)

module.exports = router;

