const express = require('express');
const Router = express.Router();
const User = require("../models/user");
const passport = require('passport');
const { storeReturnTo } = require('../middleware.js');


Router.get('/register', (req, res) => {
  res.render('users/form');
})

Router.post('/register', async (req, res, next) => {
  try {
    const { username, password, email } = req.body.user;
    console.log(req.body.user);
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
      if (err) next(err);
      req.flash('success', 'Welcome to Yelp Camp!');
      res.redirect('/campgrounds')
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/register');

  }
})

Router.get('/login', (req, res) => {
  res.render('users/login');
});

Router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), async (req, res) => {
  req.flash('success', 'Welcome back!');
  const redirectUrl = res.locals.returnTo || '/campgrounds'; 
  res.redirect(redirectUrl)
});

Router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'You have been logged out');
    res.redirect('/campgrounds');
  });
});

module.exports = Router;