const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
// const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
const session = require('express-session');
const morgan = require('morgan');
const db = require('./db/db');
// configure and create our database store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });
//passport
const passport = require('passport');

// put these in the entry point
// const secrets = require('./secrets');
// const main = require('./main')

if (process.env.NODE_ENV === 'development') {
  require('./secrets'); // this will mutate the process.env object with your secrets.
}

require('./main');

// passport registration
passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

//logging middleware
app.use(morgan('dev'));

//body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//session middleware with passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//static file-serving middleware
app.use(express.static(path.join(__dirname, '../public')));

//api routes
app.use('/api', require('./apiRoutes')); // matches all requests to /api

//sends index.html
app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

//error handling middleware
app.use(function(err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

// app.listen(port, function() {
//   console.log('Knock, knock');
//   console.log("Who's there?");
//   console.log(`Your server, listening on port ${port}`);
// });

// sync so that our session table gets created
dbStore.sync();

module.exports = app;
