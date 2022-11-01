const User = require('../models/user');
const {body, validationResult}  = require('express-validator');

exports.login_get = (req, res, next) => {
    res.render('home');
}

exports.login_post = [
    (req,res,next) => {
        const errors = validationResult(req);

        res.send('post login test');
    }
]

