const express = require('express');
const router = express.Router();
const { getAll } = require('../controllers/backOfficeController');

/* GET contacts listing. */

router.get('/contacts', getAll);

module.exports = router;