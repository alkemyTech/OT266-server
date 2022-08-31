var express = require('express');
var router = express.Router();

const { getAll, getById, createNews, putNews, deleteNews } = require('../controllers/newsController');
const { verifyAdmin } = require('../middleware/verifyAdmin');
const { newsFormValidate } = require('../utils/validators/NewsForm/createNews');

/* GET categories listing. */
router.get('/', getAll);
router.get('/:id', verifyAdmin, getById);
router.post('/news/', verifyAdmin, newsFormValidate, createNews);
router.put('/update/:id', putNews);
router.delete('/delete/:id', deleteNews);

module.exports = router;