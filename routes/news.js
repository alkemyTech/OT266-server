var express = require('express');
var router = express.Router();

const { getAll, getById, createNews, putNews, deleteNews } = require('../controllers/newsController');

/* GET categories listing. */
router.get('/', getAll);
router.get('/:id', getById);
router.post('/new/', createNews);
router.put('/update/:id', putNews);
router.delete('/delete/:id', deleteNews);

module.exports = router;
