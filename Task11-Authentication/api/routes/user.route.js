const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/user.model');
const router = express.Router();
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const Joi = require('joi');

const userAuth = require('../middleware/user.validation');
const controller = require('../../controllers/user.controller');

//Sign Up
router.post('/signup', userAuth, controller.signUp)

//Log in
router.post('/login', userAuth, controller.login)

//Get all User
router.get('/', controller.getUser);

// Delete a User
router.delete('/:id', controller.deleteUser)

module.exports = router;