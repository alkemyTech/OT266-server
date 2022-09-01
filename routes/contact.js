const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/verifyAdmin');

const { contactPost } = require('../controllers/contactController');
const { contactFormValidate } = require('../utils/validators/contactForm/createContact');

/* GET contacts listing. */

router.post('/', contactFormValidate, contactPost);


module.exports = router;