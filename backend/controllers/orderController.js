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
        const orders = await orderModel.find({}).sort({ date: -1 });
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
        const orders = await orderModel.find({ userId }).sort({ date: -1 });
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

// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const userId = req.body.userId;
        
        const order = await orderModel.findById(orderId);
        
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        
        // Check if the user is authorized to view this order
        // Allow if it's their order or if they're an admin (admin check would be in middleware)
        if (order.userId !== userId) {
            return res.status(403).json({ success: false, message: "Not authorized to view this order" });
        }
        
        res.json({ success: true, order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Cancel order
const cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const userId = req.body.userId;
        
        const order = await orderModel.findById(orderId);
        
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        
        // Check if the user is authorized to cancel this order
        if (order.userId !== userId) {
            return res.status(403).json({ success: false, message: "Not authorized to cancel this order" });
        }
        
        // Check if order can be cancelled (e.g., not already shipped)
        if (order.status !== "Order Placed" && order.status !== "Packing") {
            return res.status(400).json({ 
                success: false, 
                message: "Cannot cancel order that has been shipped or delivered" 
            });
        }
        
        // Update order status to cancelled
        order.status = "Cancelled";
        await order.save();
        
        res.json({ success: true, message: "Order cancelled successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Track order
const trackOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const userId = req.body.userId;
        
        const order = await orderModel.findById(orderId);
        
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        
        // Check if the user is authorized to track this order
        if (order.userId !== userId) {
            return res.status(403).json({ success: false, message: "Not authorized to track this order" });
        }
        
        // Create tracking information based on order status
        const trackingInfo = {
            orderId: order._id,
            status: order.status,
            timeline: getOrderTimeline(order),
            estimatedDelivery: getEstimatedDelivery(order),
            currentLocation: getCurrentLocation(order),
            paymentStatus: order.payment ? "Paid" : "Pending"
        };
        
        res.json({ success: true, trackingInfo });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Helper function to generate order timeline
const getOrderTimeline = (order) => {
    const timeline = [
        { 
            status: "Order Placed", 
            completed: true, 
            date: new Date(order.date).toISOString() 
        }
    ];
    
    const statusSequence = ["Packing", "Ship", "Out for delivery", "Delivered"];
    let allCompleted = true;
    
    for (const status of statusSequence) {
        const completed = allCompleted && (
            status === order.status || 
            statusSequence.indexOf(status) < statusSequence.indexOf(order.status)
        );
        
        if (!completed) allCompleted = false;
        
        timeline.push({
            status,
            completed,
            date: completed ? new Date().toISOString() : null
        });
    }
    
    return timeline;
};

// Helper function to estimate delivery date
const getEstimatedDelivery = (order) => {
    // Simple estimation logic - 3 days from order date
    const orderDate = new Date(order.date);
    const estimatedDate = new Date(orderDate);
    estimatedDate.setDate(orderDate.getDate() + 1);
    
    return estimatedDate.toISOString();
};

// Helper function to get current location based on status
const getCurrentLocation = (order) => {
    switch (order.status) {
        case "Order Placed":
            return "Processing at warehouse";
        case "Packing":
            return "Packaging department";
        case "Ship":
            return "In transit to delivery center";
        case "Out for delivery":
            return "With delivery agent";
        case "Delivered":
            return "Delivered to recipient";
        default:
            return "Unknown";
    }
};

export { placeOrder, allOrders, userOrders, updateStatus, getOrderById, cancelOrder, trackOrder };
