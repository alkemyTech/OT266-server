const express = require('express');
const { verifyAdmin } = require('../middleware/verifyAdmin');

const Members = require('../controllers/member.controller');

const router = express.Router();

/**
 * @swagger
 * /members:
 *  get:
 *      summary: To see all members in the database
 *      tags: [Members]
 *      responses:
 *          200:
 *              description: Ok
 *          500:
 *              description: Internal Server Error
 */
router.get('/', Members.listMembers);

/**
 * @swagger
 * /members/attributes:
 *  get:
 *      summary: To see all members in the database
 *      tags: [Members]
 *      responses:
 *          200:
 *              description: Ok
 *          500:
 *              description: Internal Server Error
 */
router.get('/attributes', verifyAdmin, Members.listMembersAttributes);

/**
 * @swagger
 * /members:
 *  post:
 *      summary: To create a new member
 *      tags: [Members]
 *      security: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    required:
 *                      -nameMember
 *                      -facebookUrl
 *                      -instagramUrl
 *                      -linkedinUrl
 *                      -image
 *                      -description
 *                    properties:
 *                      nameMember:
 *                          type: string
 *                          example: "Ignacio Martinez"
 *                      facebookUrl:
 *                          type: string
 *                          example: "https:/facebook.com/ignacio_martinez"
 *                      instagramUrl:
 *                          type: string
 *                          example: "https:/instagram.com/ignacio_martinez"
 *                      linkedinUrl:
 *                          type: string
 *                          example: "https:/linkedin.com/in/ignacio_martinez" 
 *                      image:
 *                          type: string
 *                          example: "ignacio_martinez.jpg" 
 *                      description:
 *                          type: string
 *                          example: "CEO"         
 *      responses:
 *          400:
 *              description: Bad Request
 *          201:
 *              description: Member created successfully
 *          500:
 *              description: Internal Server Error
 */
router.post('/', Members.createMember);

/**
 * @swagger
 * /members/update/{id}:
 *  put:
 *      summary: To update a member from the database
 *      tags: [Members]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: Member's id
 *            schema: 
 *              type: number
 *              example: 1
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    required:
 *                      -nameMember
 *                      -facebookUrl
 *                      -instagramUrl
 *                      -linkedinUrl
 *                      -image
 *                      -description
 *                    properties:
 *                      nameMember:
 *                          type: string
 *                          example: "Ignacio Martinez"
 *                      facebookUrl:
 *                          type: string
 *                          example: "https:/facebook.com/ignacio_martinez"
 *                      instagramUrl:
 *                          type: string
 *                          example: "https:/instagram.com/ignacio_martinez"
 *                      linkedinUrl:
 *                          type: string
 *                          example: "https:/linkedin.com/in/ignacio_martinez" 
 *                      image:
 *                          type: string
 *                          example: "ignacio_martinez.jpg" 
 *                      description:
 *                          type: string
 *                          example: "CEO"
 *      responses:
 *          404:
 *              description: Not Found
 *          200:
 *              description: Ok
 *          500:
 *              description: Internal Server Error
 */
router.put('/update/:id', Members.editMember);

/**
 * @swagger
 * /members/delete/{id}:
 *  delete:
 *      summary: To delete a member from the database
 *      tags: [Members]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: Member's id
 *            schema: 
 *              type: number
 *              example: 1
 *      responses:
 *          404:
 *              description: Not Found
 *          200:
 *              description: Ok
 *          500:
 *              description: Internal Server Error
 */
router.delete('/delete/:id', Members.deleteMember);

module.exports = router;