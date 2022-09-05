const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/verifyAdmin');

<<<<<<< HEAD
const { contactPost, contactGet, contactDelete } = require('../controllers/contactController');
=======
const { contactPost, getAllContacts } = require('../controllers/contactController');
>>>>>>> 8d1539b781f610161160ffc8e91c6f6d48da8df9
const { contactFormValidate } = require('../utils/validators/contactForm/createContact');

/* GET contacts listing. */
router.get('/', verifyAdmin, getAllContacts);
router.post('/', contactFormValidate, contactPost);
router.get('/', contactGet);
router.delete('/:id', verifyAdmin, contactDelete);


module.exports = router;