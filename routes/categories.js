var express = require('express');
var router = express.Router();

const {categoryGet} = require('../controllers/category');

/* GET categories listing. */
router.get('/', categoryGet);

module.exports = router;
