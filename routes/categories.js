var express = require('express');
var router = express.Router();

const {categoryGet, 
        categoryGetOne, 
        categoryPost, 
        categoryPut, 
        categoryDelete} = require('../controllers/category');
const { verifyAdmin } = require('../middleware/verifyAdmin');

/* GET categories listing. */
router.get('/',verifyAdmin ,categoryGet);
router.get('/:id',verifyAdmin, categoryGetOne);
router.post('/',verifyAdmin, categoryPost);
router.put('/:id',verifyAdmin, categoryPut);
router.delete('/:id',verifyAdmin, categoryDelete);

module.exports = router;
