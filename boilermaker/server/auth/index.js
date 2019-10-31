const router = require('express').Router();
const Puppy = require('../db/models/Puppy');
module.exports = router;

//login route
router.post('/login', async (req, res, next) => {
  try {
    const puppy = await Puppy.findOne({ where: { email: req.body.email } });
    if (!puppy) {
      console.log('No such user found:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else if (!puppy.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else {
      //manually sets req.user in a way that passport knows about so it can sync with session
      req.login(puppy, err => (err ? next(err) : res.json(puppy)));
    }
  } catch (err) {
    next(err);
  }
});

//signup route
router.post('/signup', async (req, res, next) => {
  try {
    const puppy = await Puppy.create(req.body);
    req.login(puppy, err => (err ? next(err) : res.json(puppy)));
  } catch (err) {
    //if user already exists, send error
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

//logout route
router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

//me route (this request is made every time the app loads, allows us to keep the user logged in on the app even after they refresh)
//this works because passport attaches the session user to the request object
router.get('/me', (req, res) => {
  res.json(req.user);
});
