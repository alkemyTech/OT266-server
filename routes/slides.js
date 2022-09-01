const express = require('express');
const router = express.Router();

//Controllers
const {slidesGET

} = require('../controllers/slidesController');

//Middlewares
const { verifyAdmin } = require('../middleware/verifyAdmin');

router.get('/', slidesGET)

module.exports = router