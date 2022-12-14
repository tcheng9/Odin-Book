//Packages
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
const session = require("express-session");
//Models
const User = require('./models/user')

//Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var profileRouter = require('./routes/profile');
var showPageRouter = require('./routes/showPage');
var signupRouter = require('./routes/signup');
var timelineRouter = require('./routes/timeline');
var postRouter = require('./routes/createPost');
require("dotenv").config();


passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { 
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user)
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" })
        }
      })
      
    });
  })
);


////////passport serializers for normal logins

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});








//FIGURE OUT HOW TO ADD FACEBOOK PATH







var app = express();
///Mongoose setup

//FIGURE OUT HOW TO ADD FACEBOOK PATH



//Url

const mongoPw = process.env.MONGOPW;
const mongoDb = "mongodb+srv://tcheng:" + mongoPw + "@cluster0.noy7cwp.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

//Session configuration
// Authentication configuration
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'cats' 
}));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Facebook passport stragey
passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID_FB,
    clientSecret: process.env.CLIENT_SECRET_FB,
    callbackURL: "http://localhost:4000/facebook/callback",
    profileFields: ['id', 'displayName', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate(
      {
        facebookId: profile.id,
        displayName: profile.displayName,
        
      }, 
      function (err, user) {
        return cb(err, user);
      });
  }
));

app.get('/facebook', passport.authenticate('facebook', {
  scope: ['email']
}));

app.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/signup' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/timeline');
  });
///////////END OF FACEBOOK STRATEGY


app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});


//
/////////NOTE: HOME PAGE HAS TO BE LOGIN PAGE
//
// app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);
app.use('/showpage', showPageRouter);
app.use('/signup', signupRouter);
app.use('/timeline', timelineRouter);
app.use('/posts', postRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

const PORT = 4000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));