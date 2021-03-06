var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var exphbs = require('express-handlebars');

// Authentication Packages
var session = require('express-session'); //cookie session
var passport = require('passport'); //passport authentication
var MySQLStore = require('express-mysql-session')(session);
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt'); //Hash password

var index = require('./routes/index.js');
var users = require('./routes/users.js');

var port = process.env.PORT || 3000;
var app = express(); // 

require('dotenv').config();

// view engine setup
app.engine('handlebars', exphbs({ defaultLayout: "index"}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator([])); //this line must be immediatle after any of the bodyParser middlewares!
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
};

var sessionStore = new MySQLStore(options);

app.use(session({
  secret: 'paewfklniuengd',
  resave: false,
  store: sessionStore,
  saveUninitialized: false,
  // cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

app.use('/', index);
app.use('/users', users);

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username);
    console.log(password);
    const db = require('./db');

    db.query('SELECT password FROM users WHERE username = ?', [username], function(err, results, fields) {
      if (err) {done(err)};

      if (results.length === 0) {
        done(null, false);
      } else {
        console.log(results[0].password.toString());
        const hash = results[0].password.toString();

        bcrypt.compare(password, hash, function(err, response) {
            if (response === true) {
              return done(null, {user_id: results[0].id})
            } else {
              return done(null, false);
            }
            return done(null, 'blah');
        });        
      }
    });
  }
));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


// Handlebars default config
const hbs = require('hbs');
const fs = require('fs');

const partialsDir = __dirname + '/views/partials';

const filenames = fs.readdirSync(partialsDir);

filenames.forEach(function (filename) {
  const matches = /^([^.]+).hbs$/.exec(filename);
  if (!matches) {
    return;
  }
  const name = matches[1];
  const template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
  hbs.registerPartial(name, template);
});

hbs.registerHelper('json', function(context) {
    return JSON.stringify(context, null, 2);
});


app.listen(port, () => {
  console.log("App is starting at port ", port)
});

module.exports = app;