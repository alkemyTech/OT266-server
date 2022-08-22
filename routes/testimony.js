var express = require('express');
var router = express.Router();

const { testimonyGet, 
        testimonyGetOne, 
        testimonyPost, 
        testimonyPut, 
        testimonyDelete} = require('../controllers/testimony');

/* GET categories listing. */
router.get('/', testimonyGet);
router.get('/:id', testimonyGetOne);
router.post('/', testimonyPost);
router.put('/', testimonyPut);
router.delete('/', testimonyDelete);

module.exports = router;
