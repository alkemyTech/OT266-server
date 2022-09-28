const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/verifyAdmin');

const { contactPost, getAllContacts } = require('../controllers/contactController');
const { contactFormValidate } = require('../utils/validators/contactForm/createContact');

/* GET contacts listing. */

router.get('/', verifyAdmin, getAllContacts);
router.post('/', contactFormValidate, contactPost);


module.exports = router;