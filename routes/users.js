const express = require('express');
const review = require('../models/review');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister) // Showing register form
    .post(catchAsync(users.register)) // Registering a new user

router.route('/login')
    .get(users.renderLogin) // Showing login form
    .post(passport.authenticate('local', {failureFlash:true, failureRedirect:'/login'}),users.login) // Logging you in

// Logging you out
router.get('/logout', users.logout);

module.exports = router;