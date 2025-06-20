import express from 'express';
import authUser from '../middlewares/auth.js';
import { addToCart, getUserCart, updateCart, removeFromCart, clearCart } from '../controllers/cartController.js';

const cartRouter = express.Router();

/**
 * @route   POST /api/cart/add
 * @desc    Add item to cart
 * @access  Private
 */
cartRouter.post('/add', authUser, addToCart);

/**
 * @route   GET /api/cart/get
 * @desc    Get user's cart
 * @access  Private
 */
cartRouter.get('/get', authUser, getUserCart);

/**
 * @route   POST /api/cart/update
 * @desc    Update cart item quantity
 * @access  Private
 */
cartRouter.post('/update', authUser, updateCart);

/**
 * @route   DELETE /api/cart/remove
 * @desc    Remove item from cart
 * @access  Private
 */
cartRouter.delete('/remove', authUser, removeFromCart);

/**
 * @route   DELETE /api/cart/clear
 * @desc    Clear entire cart
 * @access  Private
 */
cartRouter.delete('/clear', authUser, clearCart);

export default cartRouter;