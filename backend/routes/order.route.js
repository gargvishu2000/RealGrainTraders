import express from 'express';
import { placeOrder, allOrders, updateStatus, userOrders, getOrderById, cancelOrder, trackOrder } from '../controllers/orderController.js';
import adminAuth from '../middlewares/adminAuth.js';
import authUser from '../middlewares/auth.js';

const orderRouter = express.Router();

/**
 * @route   GET /api/order/:id
 * @desc    Get order by ID
 * @access  Private (user who placed the order or admin)
 */
orderRouter.get('/:id', authUser, getOrderById);

/**
 * @route   POST /api/order/place
 * @desc    Place a new order
 * @access  Private
 */
orderRouter.post('/place', authUser, placeOrder);

/**
 * @route   POST /api/order/userorders
 * @desc    Get orders for logged in user
 * @access  Private
 */
orderRouter.post('/userorders', authUser, userOrders);

/**
 * @route   POST /api/order/cancel/:id
 * @desc    Cancel an order
 * @access  Private
 */
orderRouter.post('/cancel/:id', authUser, cancelOrder);

/**
 * @route   GET /api/order/track/:id
 * @desc    Track order status
 * @access  Private
 */
orderRouter.get('/track/:id', authUser, trackOrder);

// Admin routes
/**
 * @route   GET /api/order/list
 * @desc    Get all orders (admin only)
 * @access  Admin
 */
orderRouter.get('/admin/all', adminAuth, allOrders);

/**
 * @route   POST /api/order/status
 * @desc    Update order status (admin only)
 * @access  Admin
 */
orderRouter.post('/status', adminAuth, updateStatus);

// Commented payment routes for future implementation
// orderRouter.post('/stripe', authUser, placeOrderStripe);
// orderRouter.post('/verifyStripe', authUser, verifyStripe);

export default orderRouter;