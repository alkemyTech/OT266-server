const express = require('express');
const router = express.Router();

const { commentsGet} = require('../controllers/commentsController');
const { verifyAdmin } = require('../middleware/verifyAdmin');

router.get('/', verifyAdmin, commentsGet);