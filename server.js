const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('./config/database');

const indexRouter = require('./routes/index');
const flightsRouter = require('./routes/flights');
const postingsRouter = require('./routes/postings');
const freqFlyrsRouter = require('./routes/freqFlyrs')

const app = express();

// VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// USE ROUTER
app.use('/', indexRouter);
app.use('/flights', flightsRouter);
app.use('/', postingsRouter);
app.use('/', freqFlyrsRouter);

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
