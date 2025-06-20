import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

class UserController {
    async registerUser(req, res) {
        try {
            let { name, email, password, cartData, companyName, role } = req.body;

            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ success: false, message: "User already exists" });
            }
            
            cartData = {
                items: [],
                totalQuantity: 0,
                totalAmount: 0
            };
            
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new userModel({ 
                name, 
                email, 
                password: hashedPassword, 
                cartData, 
                companyName, 
                role 
            });

            await user.save();
            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
            
            // Remove password from response
            const userResponse = user.toObject();
            delete userResponse.password;
            
            res.status(201).json({ 
                success: true, 
                user: userResponse,
                token: token 
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(401).json({ success: false, message: "User not found" });
            }
            
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ success: false, message: "Invalid Credentials" });
            }
            
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ success: true, token });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    
    async adminLogin(req, res) {
        try {
            const { email, password } = req.body;
            if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
                const token = jwt.sign(email + password, process.env.JWT_SECRET);
                res.status(200).json({ success: true, token });
            }
            else {
                res.status(401).json({ success: false, message: "Invalid Credentials" });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    
    async getUserProfile(req, res) {
        try {
            const userId = req.body.userId;
            const user = await userModel.findById(userId).select('-password');
            
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            
            res.status(200).json({ success: true, user });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    
    async updateUserProfile(req, res) {
        try {
            const userId = req.body.userId;
            const { name, email, companyName } = req.body;
            
            // Check if email is being changed and if it's already in use
            if (email) {
                const existingUser = await userModel.findOne({ email, _id: { $ne: userId } });
                if (existingUser) {
                    return res.status(400).json({ success: false, message: "Email already in use" });
                }
            }
            
            const updateData = {};
            if (name) updateData.name = name;
            if (email) updateData.email = email;
            if (companyName) updateData.companyName = companyName;
            updateData.updatedAt = Date.now();
            
            const user = await userModel.findByIdAndUpdate(
                userId,
                updateData,
                { new: true, runValidators: true }
            ).select('-password');
            
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            
            res.status(200).json({ success: true, user });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    
    async logoutUser(req, res) {
        try {
            // JWT tokens are stateless, so we can't invalidate them server-side
            // This endpoint is mainly for client-side token removal
            // For a more secure approach, implement token blacklisting
            
            res.status(200).json({ success: true, message: "Logged out successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    
    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            const user = await userModel.findOne({ email });
            
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            
            // Generate reset token
            const resetToken = crypto.randomBytes(20).toString('hex');
            
            // Set token expiry (1 hour)
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpire = Date.now() + 3600000;
            
            await user.save();
            
            // In a real application, send email with reset link
            // For now, just return the token in the response
            
            res.status(200).json({ 
                success: true, 
                message: "Password reset token generated",
                resetToken
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    
    async resetPassword(req, res) {
        try {
            const { token } = req.params;
            const { password } = req.body;
            
            // Find user with valid token
            const user = await userModel.findOne({
                resetPasswordToken: token,
                resetPasswordExpire: { $gt: Date.now() }
            });
            
            if (!user) {
                return res.status(400).json({ 
                    success: false, 
                    message: "Invalid or expired reset token" 
                });
            }
            
            // Update password
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            
            await user.save();
            
            // Generate new login token
            const loginToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            
            res.status(200).json({ 
                success: true, 
                message: "Password reset successful",
                token: loginToken
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    
    async getAllUsers(req, res) {
        try {
            const users = await userModel.find().select('-password');
            res.status(200).json({ success: true, users });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            
            const user = await userModel.findByIdAndDelete(id);
            
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            
            res.status(200).json({ success: true, message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

export default UserController;