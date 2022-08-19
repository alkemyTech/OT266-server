const express = require('express');

const Members = require('../controllers/member.controller'); 

const router = express.Router();

router.get('/', Members.allMembers);

router.post('/new', Members.createMember);

router.update('/update/:id', Members.editMember);

router.delete('/delete/:id', Members.deleteMember);

module.exports = router;