import userModel from "../models/userModel.js";

/**
 * Add products to user cart
 * @route POST /api/cart/add
 */
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

/**
 * Update cart item quantity
 * @route POST /api/cart/update
 */
export const updateCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const { grainId, quantity, price } = req.body;
        
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

        cartData.items[itemIndex].quantity = parseInt(quantity);

        // Recalculate totals
        cartData.totalQuantity = cartData.items.reduce((total, item) => total + item.quantity, 0);
        cartData.totalAmount = cartData.items.reduce((total, item) => total + (item.price * item.quantity), 0);

        const updateUser = await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

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

/**
 * Get user's cart
 * @route GET /api/cart/get
 */
export const getUserCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            cartData: userData.cartData || { items: [], totalQuantity: 0, totalAmount: 0 }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

/**
 * Remove item from cart
 * @route DELETE /api/cart/remove
 */
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const { grainId } = req.body;
        
        if (!userId || !grainId) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || { items: [], totalQuantity: 0, totalAmount: 0 };
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

        const updateData = await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

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

/**
 * Clear entire cart
 * @route DELETE /api/cart/clear
 */
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

        const updatedUser = await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

        res.json({
            success: true,
            message: "Cart cleared",
            cartData: updatedUser.cartData
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}