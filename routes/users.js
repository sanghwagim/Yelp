const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../ultils/CatchAsync');
const ExpressError = require('../ultils/ExpressError');
const passport = require('passport');
const users = require('../constrollers/users');


router.route('/register')
        .get(users.renderRegister)
        .post(catchAsync( users.newUser));
router.route('/login')
        .get(users.renderLogin)
        .post(passport.authenticate('local', {failureFlash : true, failureRedirect : '/login' }), users.login);

router.get('/logout', users.logout);

module.exports = router; 