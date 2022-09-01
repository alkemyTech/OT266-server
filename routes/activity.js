const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/verifyAdmin');

const { activityGet, activityPost, activityUpdate, activityDelete } = require('../controllers/activityController');
const { activityFormValidate } = require('../utils/validators/ActivityForm/createActivity');

/* GET activities listing. */
router.get('/', activityGet);
router.post('/', verifyAdmin, activityFormValidate, activityPost);
router.put('/:id', verifyAdmin, activityUpdate);
router.delete('/:id', verifyAdmin, activityDelete);


module.exports = router;