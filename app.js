const dbConnect = require('./config/database');
dbConnect();
var createError = require('http-errors');
var express = require('express');
const hbs = require('hbs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {sessionMiddleware,checkSession} = require("./middleware/sessionMiddleware");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const dashboardRouter = require('./routes/dashboard');
const propertyRouter=require('./routes/property');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');
app.use(sessionMiddleware);
app.use((req, res, next) => {
  console.log('Current session:', req.session);
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views/templates/partials/'));
hbs.registerHelper('incrementCounter', function(index) {
  return index + 1;
});
hbs.registerHelper('eq', (a, b) => {
  return a === b;
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/',authRouter);
app.use('/',dashboardRouter);
app.use('/',propertyRouter);


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
