const express = require('express');
const router = express.Router();

//Controllers
const {
    slidesGET,
    slideInfoById
} = require('../controllers/slidesController');

//Middlewares
const { verifyAdmin } = require('../middleware/verifyAdmin');

router.get('/', verifyAdmin, slidesGET)
router.get('/:id', verifyAdmin, slideInfoById)

module.exports = router