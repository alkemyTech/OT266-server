const express = require('express');
const router = express.Router();

//Import utils
const {commentPost} = require("../utils/validators/CommentPost/commentPost");

//Import middlewares
const {verifyAuth} = require('../middleware/verifyAuth')

//Import handlers
const {
    commentsPost
} = require('../controllers/commentController')

//Routes
router.post('/',[verifyAuth,commentPost] , commentsPost)

module.exports = router;