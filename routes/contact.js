const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/verifyAdmin');

const { contactPost } = require('../controllers/contactController');

/* GET contacts listing. */

router.post('/', contactPost);


module.exports = router;