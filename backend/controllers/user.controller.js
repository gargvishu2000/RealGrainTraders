
import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

class UserController {

    async registerUser(req, res) {
        try {
            let { name, email, password, cartData, companyName, role } = req.body;

            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }
             cartData = {
                items: [],
                totalQuantity: 0,
                totalAmount: 0
            };
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new userModel({ name, email, password: hashedPassword, cartData, companyName, role });
            console.log(user);

            await user.save();
            res.status(201).json({ success: true, user });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid Credentials" });
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
}

export default UserController;