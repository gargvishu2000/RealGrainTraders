
import express from 'express';
import UserController from '../controllers/user.controller.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);
userRouter.post('/admin-login', userController.adminLogin);

export default userRouter;