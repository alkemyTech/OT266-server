const express = require('express');
const router = express.Router();
const { getAll } = require('../controllers/backOfficeController');
const { verifyAdmin } = require('../middleware/verifyAdmin');

/* GET contacts listing. */

/**
 * @swagger
 * /backoffice/contacts:
 *  get:
 *      summary: To see all the contacts in the database
 *      tags: [Backoffice]
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad Request
 */
router.get('/contacts', verifyAdmin, getAll);

module.exports = router;