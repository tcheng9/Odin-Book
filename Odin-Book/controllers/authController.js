const User = require('../models/user');
const {body, validationResult}  = require('express-validator');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var async = require('async');

exports.login_get = (req, res, next) => {
    res.render('home', {user: res.locals.currentUser});
}


exports.login_post = passport.authenticate("local", {
    successRedirect: "/timeline",
    failureRedirect: "/signup"
});

// exports.login_post = async (req, res, next) => {
//     const users = await User.find({username: req.body.username });
//     if (users == null){
//         return res.status(400).send('cannot find user');
//     }
    
//     try {
//         if(await bcrypt.compare(req.body.password, users[0].password)){
//             const currUser = {username: users[0].username}
            
//             const accessToken = jwt.sign(currUser, process.env.ACCESS_TOKEN_SECRET);
            
//             res.json({accessToken: accessToken});
//         } else {
//             res.json('not successful');
//         }
//      } catch (err) {
//         res.status(500).json({message: err.message});
//     }
// }
