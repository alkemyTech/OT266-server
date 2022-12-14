const express = require('express');
const router = express.Router();

const { testimonyGet, 
        testimonyGetOne, 
        testimonyPost, 
        testimonyPut, 
        testimonyDelete} = require('../controllers/testimonyController');
const { verifyAdmin } = require('../middleware/verifyAdmin');

const { testimonyFormValidate } = require('../utils/validators/TestimonyForm/createTestimony');

/* GET testimonies listing. */

router.get('/', verifyAdmin ,testimonyGet);
router.get('/:id', verifyAdmin, testimonyGetOne);
router.post('/',[verifyAdmin,testimonyFormValidate], testimonyPost);
router.put('/:id', [verifyAdmin,testimonyFormValidate], testimonyPut);
router.delete('/:id', verifyAdmin, testimonyDelete);

module.exports = router;
