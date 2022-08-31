var express = require('express');
var router = express.Router();

const { getAll, getById, createNews, putNews, deleteNews } = require('../controllers/newsController');
const { verifyAdmin } = require('../middleware/verifyAdmin');

/* GET categories listing. */
router.get('/', getAll);
router.get('/:id', verifyAdmin, getById);
router.post('/new/', createNews);
router.put('/:id', verifyAdmin, putNews);
router.delete('/delete/:id', deleteNews);

module.exports = router;
