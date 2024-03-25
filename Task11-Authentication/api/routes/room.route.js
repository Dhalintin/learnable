const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Room = require('../models/room.model')
const RoomType = require('../models/roomtype.model');
const checkAuth = require('../middleware/user.auth');
const Joi = require('joi');
const controller = require('../../controllers/room.controller');

const roomAuth = require('../middleware/room.validation');

//Get all Room with or without a specific parameters
router.get('/', controller.getAllRooms);


//Create a new Room 
router.post('/', roomAuth, checkAuth, controller.addNewRoom);

//Get a specific room by ID
router.get('/:id', controller.getRoom);

//Update a specific Room
router.patch('/:id', checkAuth, controller.editRoom);


//Delete a specific room
router.delete('/:id', checkAuth, controller.deleteRoom);

module.exports = router;