var express = require('express');
var router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//Controllers
const auth_controller = require('../controllers/authController');

/* GET home page - for login */
router.get('/', auth_controller.login_get);

/* POST home page  - for login */
router.post('/login', auth_controller.login_post);

module.exports = router;
