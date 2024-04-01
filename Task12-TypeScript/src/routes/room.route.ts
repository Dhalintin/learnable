import express from 'express';
import mongoose from 'mongoose';
import { Router } from 'express';
import controller from '../controllers/roomController';
import roomValidation from '../middlewares/room.validation';
import userAuth from '../middlewares/user.auth'

const router: Router = express.Router();

// Get all rooms with or without specific parameters
router.get('/', controller.getAllRooms);

// Create a new room
router.post('/', userAuth, roomValidation, controller.addNewRoom);

// Get a specific room by ID
router.get('/:id', controller.getRoom);

// Update a specific room
router.patch('/:id', userAuth, controller.editRoom);

// Delete a specific room
router.delete('/:id', userAuth, controller.deleteRoom);

export default router;
