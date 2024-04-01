import express from 'express'
const router = express.Router()
import roomRoute from './room.route'
import roomTypeRoute from './roomtype.route';
import userRoute from './user.route';

router.use('/rooms', roomRoute)
router.use('/roomtype', roomTypeRoute);
router.use('/user', userRoute);

export default router