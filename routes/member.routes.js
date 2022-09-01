const express = require('express');
const { verifyAdmin } = require('../middleware/verifyAdmin');

const Members = require('../controllers/member.controller'); 

const router = express.Router();

router.get('/', Members.listMembers);

router.get('/attributes', verifyAdmin, Members.listMembersAttributes);

router.post('/', Members.createMember);

router.put('/update/:id', Members.editMember);

router.delete('/delete/:id', Members.deleteMember);

module.exports = router;