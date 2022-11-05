const Post = require('../models/post');
const {body, validationResult} = require('express-validator');
const bcrypt = require("bcrypt");
const passport = require('passport');
const user = require('../models/user');

exports.create_post = [
    body('title', 'title cannot be empty')
        .trim()
        .isLength({min:1})
        .escape(),
    body('message', 'message cannot be empty')
        .trim()
        .isLength({min:1})
        .escape(),
    async (req, res, next) => {
        const errors = validationResult(req);

        const post = new Post({
            title: req.body.title,
            authorId: 'placeholder',
            commentId: 'placeholder',
            message: req.body.message,
            likes: 'placeholder',
            timestamp: 'placeholder'
        })

        if (!errors.isEmpty()){
            return res.render('createPost', {
                post, 
                errors: errors.array()
            });
        } else {
            post.save((err) => {
                if(err) return next(err);
                return res.redirect('/timeline')
            })
        }
    }
]

// 
// title: {type: String},
// authorId: {type: String},
// commentId: {type: String},
// message: {type: String},
// likes: {type: String}, //How to deal with likes counts and likes users?
// timestamp: {type: String}