var express = require('express');
var router = express.Router();

const { activityGet, activityPost, activityUpdate, activityDelete } = require('../controllers/activityController');

/* GET activities listing. */
router.get('/', activityGet);
router.post('/', activityPost);
router.put('/:id', activityUpdate);
router.delete('/:id', activityDelete);


module.exports = router;