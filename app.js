var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();
const nodeCron = require("node-cron");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var _16 = require('./routes/16');
var _18 = require('./routes/18');
var data = require('./routes/data');
const { db } = require('./db');

var app = express();

nodeCron.schedule(" */15 * * * *", () => {
  db.query("SELECT 1", function (error, results, fields) {
    console.log("heartbeat")
  })
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/data', data);
app.use('/16', _16);
app.use('/18', _18);

app.use('/users', usersRouter);

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
