const User = require('../models/user');
const {body, validationResult}  = require('express-validator');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

exports.login_get = (req, res, next) => {
    res.render('home', {user: res.locals.currentUser});
}


exports.login_post = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signup"
});