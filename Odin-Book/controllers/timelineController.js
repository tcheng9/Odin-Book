const Post = require('../models/post');
const {body, validationResult} = require('express-validator');
const bcrypt = require("bcrypt");
const passport = require('passport');
const user = require('../models/user');

/* GET all post */
exports.get_post = (req, res, next) => {
    Post.find({})
        .exec(function(err, posts) {
            console.log(posts);
            if(err){
                return res.send('error');
            }

            res.render('timeline', {
                title: 'All posts',
                user: req.user,
                posts: posts,
            })
        })
};


//Figuring out Like button
exports.like_button = [


    (req, res, next) => {
        console.log(req.post);
        res.render('timeline', {
            user: req.user,
            posts: req.posts
        });
    }
]

