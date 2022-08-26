var express = require('express');
var router = express.Router();

const { activityGet, activityPost, activityUpdate, activityDelete } = require('../controllers/activityController');
const { activityFormValidate } = require('../utils/validators/ActivityForm/createActivity');

/* GET activities listing. */
router.get('/', activityGet);
router.post('/', activityFormValidate, activityPost);
router.put('/:id', activityUpdate);
router.delete('/:id', activityDelete);


module.exports = router;