const express = require('express');
const router = express.Router();

//Import handlers
const {
    commentsPost
} = require('../controllers/commentController')

//Routes
router.post('/', commentsPost)

module.exports = router;