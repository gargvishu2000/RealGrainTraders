import express from 'express';
import UserController from '../controllers/user.controller.js';
import authUser from '../middlewares/auth.js';
import adminAuth from '../middlewares/adminAuth.js';
import rateLimit from 'express-rate-limit';

const userRouter = express.Router();
const userController = new UserController();

// Rate limiting for auth routes to prevent brute force attacks
const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 5 requests per windowMs
  message: { success: false, message: 'Too many login attempts, please try again later' }
});

/**
 * @route   POST /api/users/register
 * @desc    Register a new user
 * @access  Public
 */
userRouter.post('/register', userController.registerUser);

/**
 * @route   POST /api/users/login
 * @desc    Login user and get token
 * @access  Public
 */
userRouter.post('/login', authLimiter, userController.loginUser);

/**
 * @route   POST /api/users/admin-login
 * @desc    Admin login
 * @access  Public
 */
userRouter.post('/admin-login', authLimiter, userController.adminLogin);

/**
 * @route   GET /api/users/profile
 * @desc    Get user profile
 * @access  Private
 */
userRouter.get('/profile', authUser, userController.getUserProfile);

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile
 * @access  Private
 */
userRouter.put('/profile', authUser, userController.updateUserProfile);

/**
 * @route   POST /api/users/logout
 * @desc    Logout user (optional - for token blacklisting if implemented)
 * @access  Private
 */
userRouter.post('/logout', authUser, userController.logoutUser);

/**
 * @route   POST /api/users/password/forgot
 * @desc    Request password reset
 * @access  Public
 */
userRouter.post('/password/forgot', userController.forgotPassword);

/**
 * @route   POST /api/users/password/reset/:token
 * @desc    Reset password with token
 * @access  Public
 */
userRouter.post('/password/reset/:token', userController.resetPassword);

/**
 * @route   GET /api/users
 * @desc    Get all users (admin only)
 * @access  Admin
 */
userRouter.get('/', adminAuth, userController.getAllUsers);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user (admin only)
 * @access  Admin
 */
userRouter.delete('/:id', adminAuth, userController.deleteUser);

export default userRouter;