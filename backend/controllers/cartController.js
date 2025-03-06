import userModel from "../models/userModel.js";

// Add Products to user cart
export const addToCart = async (req, res) => {
    const { grainId, quantity, price } = req.body;
    const userId = req.body.userId;
    try {
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        let cartData = userData.cartData || { items: [], totalQuantity: 0, totalAmount: 0 };
        // Find if item already exists in cart
        const existingItemIndex = cartData.items.findIndex(
            item => item.grainId.toString() === grainId
        );

        if (existingItemIndex !== -1) {
            // Update existing item quantity
            cartData.items[existingItemIndex].quantity += quantity;
        } else {
            // Add new item to cart
            cartData.items.push({
                grainId,
                quantity,
                price
            });
        }
        // Update cart totals
        cartData.totalQuantity = cartData.items.reduce((total, item) => total + item.quantity, 0);
        cartData.totalAmount = cartData.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        // Update user's cart in database
        const updatedUser = await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
        
        res.json({
            success: true,
            message: "Added to cart",
            cartData: updatedUser.cartData
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
 
export const updateCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const {  grainId, quantity,price } = req.body;
        console.log(userId);
        
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData;

        const itemIndex = cartData.items.findIndex(
            item => item.grainId.toString() === grainId.toString()
        );
        console.log(itemIndex);
        

        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        // if (quantity <= 0) {
        //     // Remove item if quantity is 0 or negative
        //     cartData.items.splice(itemIndex, 1);
        // } else {
        //     // Update quantity
        //     cartData.items[itemIndex].quantity = quantity;
        // }
        cartData.items[itemIndex].quantity = parseInt(quantity);

        // Recalculate totals
        cartData.totalQuantity = cartData.items.reduce((total, item) => total + item.quantity, 0);
        cartData.totalAmount = cartData.items.reduce((total, item) => total + (item.price * item.quantity), 0);

        const updateUser= await userModel.findByIdAndUpdate(userId, { cartData },{new: true});

        res.json({
            success: true,
            message: "Cart Updated",
            cartData: updateUser.cartData
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getUserCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            cartData: userData.cartData
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Add a new function to remove items from cart
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const { grainId } = req.body;
        if (!userId || !grainId) {
            console.log("Missing required fields:", { userId, grainId });
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData;
        const itemIndex = cartData.items.findIndex(
            item => item.grainId.toString() === grainId.toString()
        );

        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        // Remove item from cart
        cartData.items.splice(itemIndex, 1);

        // Recalculate totals
        cartData.totalQuantity = cartData.items.reduce((total, item) => total + item.quantity, 0);
        cartData.totalAmount = cartData.items.reduce((total, item) => total + (item.price * item.quantity), 0);

        const updateData= await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({
            success: true,
            message: "Item removed from cart",
            cartData: updateData.cartData
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Add a function to clear the entire cart
export const clearCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Reset cart to empty state
        const cartData = {
            items: [],
            totalQuantity: 0,
            totalAmount: 0
        };

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({
            success: true,
            message: "Cart cleared",
            cartData
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
