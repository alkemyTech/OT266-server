const express = require('express');
const Roles = require('../controllers/roleController'); 
const { verifyAdmin } = require('../middleware/verifyAdmin');

const router = express.Router();

router.get('/', verifyAdmin, Roles.listRole);
router.post('/new', verifyAdmin, Roles.createRole);
router.put('/update/:id', verifyAdmin, Roles.editRole);
router.delete('/delete/:id', verifyAdmin, Roles.deleteRole);

module.exports = router;