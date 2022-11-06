const Post = require('../models/post');
const {body, validationResult} = require('express-validator');
const bcrypt = require("bcrypt");
const passport = require('passport');
const user = require('../models/user');

/* GET all post */
// exports.get_post = (req, res, next) => {
//     Post.find({})
//         .exec(function(err, posts) {
//             if(err){
//                 return res.send('error');
//             }

//             res.render('timeline', {
//                 title: 'All posts',
//                 user: req.user,
//                 posts: posts,
//             })
//         })
// };

/* (POST) create a post function */
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

        console.log(req.params.id);

        const post = new Post({
            title: req.body.title,
            authorId: req.params.id,
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