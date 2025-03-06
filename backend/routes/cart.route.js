import express from 'express';
import authUser from '../middlewares/auth.js';
import { addToCart,getUserCart,updateCart,removeFromCart } from '../controllers/cartController.js  ';


const cartrouter = express.Router();

cartrouter.post('/add',authUser, addToCart);
cartrouter.get('/get',authUser, getUserCart);
cartrouter.post('/update',authUser, updateCart)
cartrouter.delete('/remove',authUser, removeFromCart);

export default cartrouter;