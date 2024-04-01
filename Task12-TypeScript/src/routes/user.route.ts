import express from 'express';
import { Router } from 'express';
import controller from '../controllers/userController'

const router: Router = express.Router();

//Sign Up
router.post('/signup', controller.signUp)

//Log in
router.post('/login', controller.login)

//Get all User
router.get('/', controller.getUser);

// Delete a User
router.delete('/:id', controller.deleteUser)

export default router;