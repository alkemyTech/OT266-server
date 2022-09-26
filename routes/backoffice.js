const express = require('express');
const router = express.Router();
const { getAll } = require('../controllers/backOfficeController');
const { verifyAdmin } = require('../middleware/verifyAdmin');

/* GET contacts listing. */

router.get('/contacts', verifyAdmin, getAll);

module.exports = router;