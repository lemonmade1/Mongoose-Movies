const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const passport = require('passport');
const methodOverride = require('method-override');

require('dotenv').config()
require('./config/database');
require('./config/passport');

const indexRouter = require('./routes/index');
const buyersRouter = require('./routes/buyers');
const commentsRouter = require('./routes/comments');
const viewersRouter = require('./routes/viewers')

const app = express();

// VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'SEI_Rocks!',
  resave: false,
  saveUninitialized: true
}));

// using passport
app.use(passport.initialize());
app.use(passport.session());

// USE ROUTER
app.use('/', indexRouter);
app.use('/buyers', buyersRouter);
app.use('/', commentsRouter);
app.use('/', viewersRouter);

// CATCH 404 AND FORWARD TO ERROR HANDLER
app.use((req, res, next) => {
  next(createError(404));
});

// ERROR HANDLER
app.use((err, req, res, next) => {

  // SET LOCALS, ONLY TO PROVIDE ERROR IN DEVELOPMENT
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // RENDER ERROR PAGE
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
