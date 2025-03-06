import express from 'express';
import { placeOrder,allOrders,updateStatus,userOrders } from '../controllers/orderController.js';
import adminAuth from '../middlewares/adminAuth.js';
import authUser from '../middlewares/auth.js';

const orderRouter = express.Router();

// Admin routes
orderRouter.post('/list',adminAuth, allOrders);
orderRouter.post('/status',adminAuth, updateStatus);

// Payment routes
orderRouter.post('/place',authUser, placeOrder);
// orderRouter.post('/stripe',authUser, placeOrderStripe);

// User Routes
orderRouter.post('/userorders', authUser, userOrders);

// verify payment
// orderRouter.post('/verifyStripe', authUser, verifyStripe);

export default orderRouter;