import express from 'express';
import { Router } from 'express';
import controller from '../controllers/roomTypeController'
import adminAuth from '../middlewares/admin.auth';
// import roomTypeValidation from '../middlewares/roomType.validation';

const router: Router = express.Router();

// Get all rooms with or without specific parameters
router.get('/', controller.getAllRoomTypes);

// Create a new roomtype
router.post('/', adminAuth, controller.addNewRoomType);

// Get a specific room by ID
router.get('/:id', controller.getRoomType);

// Update a specific room
router.patch('/:id', adminAuth, controller.editRoomType);

// Delete a specific room
router.delete('/:id', adminAuth, controller.deleteRoomType);

export default router;
