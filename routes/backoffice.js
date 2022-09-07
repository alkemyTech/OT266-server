const express = require('express');
const router = express.Router();
const { getAll } = require('../controllers/backOfficeController');

/* GET contacts listing. */

/**
 * @swagger
 * /backoffice/contacts:
 *  get:
 *      summary: To see all contacts in the database
 *      tags: [Backoffice]
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad Request
 */
router.get('/contacts', getAll);

module.exports = router;