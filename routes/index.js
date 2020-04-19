const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function(req, res, next) {
  res.redirect('/buyers');
});

router.get('/home', (req, res, next) => {
  const newLocal = 'home/index';
  res.render(newLocal, {
    title: `Lemon'made Estates`,
    user: req.user,
  })
});


// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { 
    scope: [
      'profile', 
      'email' 
    ] 
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/buyers',
    failureRedirect: '/'
  }
));

 // OAuth logout route
router.get('/logout', (req, res) => {
  req.logout();
  // res.redirect('/buyers');
  res.redirect('/');
});

module.exports = router;
