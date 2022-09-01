const express = require('express');
const router = express.Router();

//Controllers
const {
    slidesGET,
    slideInfoById,
    slideUpdateById,
    deleteUserById
} = require('../controllers/slidesController');

//Middlewares
const { verifyAdmin } = require('../middleware/verifyAdmin');
const {checkSlideExistsById} = require('../middleware/checkSlideExistsById')

//Routes
router.get('/', verifyAdmin, slidesGET)
router.get('/:id', verifyAdmin, checkSlideExistsById, slideInfoById)
router.put('/:id', verifyAdmin, checkSlideExistsById, slideUpdateById)
router.delete('/:id', verifyAdmin, checkSlideExistsById, deleteUserById)

module.exports = router