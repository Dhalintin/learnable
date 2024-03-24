const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const RoomType = require('../models/roomtype.model');
const checkAuth = require('../middleware/user.auth');
const Joi = require('joi');
const { roomTypeSchemaValidation } = require('../../validation');
const controller = require('../../controllers/roomtype.controller')

//Get all RoomTypes
router.get('/', controller.getAllRoomTypes);

//Create new Room Types
router.post('/', checkAuth, controller.addNewRoomType);

// Get a specific roomtype by ID
router.get('/:id', controller.getRoomType);

//Update a specific roomtype
router.patch('/:id', checkAuth, controller.editRoomType);

// Delete a specific room type
router.delete('/:id', checkAuth, controller.deleteRoomType);


module.exports = router;