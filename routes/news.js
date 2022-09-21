const express = require('express');
const router = express.Router();

const { getAll, getById, createNews, putNews, deleteNews, getNewsComments } = require('../controllers/newsController');
const { verifyAdmin } = require('../middleware/verifyAdmin');
const { newsFormValidate } = require('../utils/validators/NewsForm/createNews');

/* GET news listing. */

router.get('/', getAll);
router.get('/:id', verifyAdmin, getById);
router.get('/:id/comments', getNewsComments);
router.post('/', verifyAdmin, newsFormValidate, createNews);
router.put('/:id', verifyAdmin, putNews);
router.delete('/:id', verifyAdmin, deleteNews);

module.exports = router;