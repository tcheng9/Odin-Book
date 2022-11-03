const User = require('../models/user');
const {body, validationResult} = require('express-validator');
const bcrypt = require("bcrypt");
const passport = require('passport');

exports.signup_get = (req, res, next) => {

    
    res.render('signup');
}

exports.signup_post = [
    body('username', 'username cannot be empty')    
        .trim()
        .isLength({min:1})
        .escape(),
    body('password', 'password cannot be empty')
        .trim()
        .isLength({min:1})
        .escape(),
    async (req, res, next) => {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        const errors = validationResult(req);

        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            pendingFriendsRequests: 'none for now',
            friends: 'none for now',
            facebookId: "none",
        });

        if (!errors.isEmpty()) {
            //If there are errors, return the errors
            return res.render('signup', {
                user,
                errors:errors.array()
            });
        } else {
            //If there aren't errors, save the user
            user.save((err) => {
                if (err) return next(err);
                return res.redirect('/');
            })
        }
    }
    
]