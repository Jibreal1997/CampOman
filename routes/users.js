const express = require('express');
const review = require('../models/review');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const users = require('../controllers/users');

// Showing register form
router.get('/register', users.renderRegister);

// Registering a new user
router.post('/register', catchAsync(users.register));

// Showing login form
router.get('/login', users.renderLogin);

// Logging you in
router.post('/login',passport.authenticate('local', {failureFlash:true, failureRedirect:'/login'}),users.login);

// Logging you out
router.get('/logout', users.logout);

module.exports = router;