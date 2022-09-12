const express = require('express');
const router = express.Router();

const upload = require('../config/multer');
const controller = require('../controllers/imagesController');

const { verifyAdmin } = require('../middleware/verifyAdmin');



// 'file' is the name of our file input field in the form
router.post('/upload', verifyAdmin, upload.single('file'), controller.upload);

module.exports = router;