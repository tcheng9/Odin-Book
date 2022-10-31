const User = require('../models/user');

exports.signup_get = (req, res, next) => {
    res.render('home');
}

exports.signup_post = (req, res, next) => {
    res.send('signup post');
}

