const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/verifyAdmin');

const { contactPost, getAllContacts } = require('../controllers/contactController');
const { contactFormValidate } = require('../utils/validators/contactForm/createContact');

/* GET contacts listing. */

/**
 * @swagger
 * /contacts:
 *  get:
 *      summary: To see all the contacts in the database
 *      tags: [Contacts]
 *      responses:
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad Request
 */
router.get('/', verifyAdmin, getAllContacts);

/**
 * @swagger
 * /contacts:
 *  post:
 *      summary: To register a new contact
 *      tags: [Contacts]
 *      security: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    required:
 *                      -name
 *                      -phone
 *                      -email
 *                      -message
 *                    properties:
 *                      name:
 *                          type: string
 *                          example: "Eze"
 *                      phone:
 *                          type: string
 *                          example: "214748"
 *                      email:
 *                          type: string
 *                          example: "ezegeek@gmail.com"
 *                      message:
 *                          type: string
 *                          example: "Message text"        
 *      responses:
 *          201:
 *              description: Contact registered successfully
 *          200:
 *              description: Ok
 *          400:
 *              description: Bad Request
 */
router.post('/', contactFormValidate, contactPost);


module.exports = router;