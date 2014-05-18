'use strict';

// Module Dependencies
var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    morgan  = require('morgan'),
    flash = require('connect-flash'),
    http = require('http'),
    path = require('path'),
    connect = require('connect'),
    session = require('express-session');

// config
var app = module.exports = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(morgan('dev'));
app.use(cookieParser() );
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  console.log('Development Environment initialized!');
  require('./app/config/env/local_config');
  app.use(connect.errorHandler());
}

// stage only
if (env === 'stage') {
  console.log('Stage Environment initialized');
  app.use(connect.errorHandler());
}

// production only
if (env === 'production') {
  console.log('Production Environment initialized');
}

// test only
if (env === 'test') {
  console.log('Test environment initialized!');
}

// configuration
var config = require('./app/config/config');
require('./app/config/passport')(passport, config); // pass passport for configuration

// passport configuration
app.use(session({ secret: 'clipsclipsplayclipsandwerock!' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// APIs
// load our routes and pass in our app and fully configured passport
require('./app/routes/index')(app, passport);
require('./app/routes/api')(app, config);


// get the baby rollin'
http.createServer(app).listen(app.get('port'), function () {
  console.log('Magic started on port: ' + app.get('port'));
});