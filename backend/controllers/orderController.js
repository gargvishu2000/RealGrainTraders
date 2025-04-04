import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing orders using COD 
const placeOrder = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.body.userId;
        
        const orderData = {
            userId: userId,
            items,
            address: JSON.parse(address),
            amount: Number(amount),
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        res.json({ success: true, message: "Order Placed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// All orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// User order for frontend
const userOrders = async (req, res) => {
    try {
        const userId = req.body.userId;
        const orders = await orderModel.find({userId})
        console.log(orders);
        
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Order update Status
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { placeOrder, allOrders, userOrders, updateStatus }