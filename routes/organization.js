const express = require('express');
const { verifyAdmin } = require('../middleware/verifyAdmin');
const { verifyUser } = require('../middleware/verifyUser');

const Organizations = require('../controllers/organizationController'); 

const router = express.Router();

router.get('/public', Organizations.listOrganizationpublic);
router.get('/', verifyUser, Organizations.listOrganization);
router.post('/new', verifyAdmin, Organizations.createOrganization);
router.put('/update/:id', verifyAdmin, Organizations.editOrganization);
router.delete('/delete/:id', verifyAdmin, Organizations.deleteOrganization);

module.exports = router;