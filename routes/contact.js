const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/verifyAdmin');

const { contactPost, contactGet, contactDelete } = require('../controllers/contactController');
const { contactFormValidate } = require('../utils/validators/contactForm/createContact');

/* GET contacts listing. */

router.post('/', contactFormValidate, contactPost);
router.get('/', contactGet);
router.delete('/:id', verifyAdmin, contactDelete);


module.exports = router;