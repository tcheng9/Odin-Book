//Library imports
var express = require('express');
var router = express.Router();

//Controllers imports
const signup_controller = require('../controllers/signupController');


/* GET home page. */
router.get('/', signup_controller.signup_get);

/* POST home page */
router.post('/', signup_controller.signup_post);

module.exports = router;
