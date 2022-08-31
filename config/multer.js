const multer = require('multer');

var memoryStorage = multer.memoryStorage();
var upload = multer({ storage: memoryStorage })

module.exports = upload;
