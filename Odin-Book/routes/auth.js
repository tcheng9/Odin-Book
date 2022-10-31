var express = require('express');
var router = express.Router();

//Controllers
const auth_controller = require('../controllers/authController');

/* GET home page - for login */
router.get('/', auth_controller.login_get);

/* POST home page  - for login */
router.post('/', auth_controller.login_post);

module.exports = router;
