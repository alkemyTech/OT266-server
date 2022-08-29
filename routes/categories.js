var express = require('express');
var router = express.Router();

const {categoryGet, 
        categoryGetOne, 
        categoryPost, 
        categoryPut, 
        categoryDelete} = require('../controllers/categoryController');
const { verifyAdmin } = require('../middleware/verifyAdmin');

const { categoryFormValidate } = require('../utils/validators/CategoryForm/createCategory');


/* GET categories listing. */
router.get('/',verifyAdmin ,categoryGet);
router.get('/:id',verifyAdmin, categoryGetOne);
router.post('/',[verifyAdmin, categoryFormValidate], categoryPost);
router.put('/:id',[verifyAdmin, categoryFormValidate], categoryPut);
router.delete('/:id',verifyAdmin, categoryDelete);

module.exports = router;
