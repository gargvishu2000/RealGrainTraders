import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\S+@\S+\.\S+$/,
            "Please use a valid email address",
        ],
    },
    password: {
        type: String,
        required: true,
    },
    cartData: {
        items: [{
            grainId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Grain'
            },
            quantity: Number,
            price: Number
            // any other item-specific fields you need
        }],
        totalQuantity: {
            type: Number,
            default: 0
        },
        totalAmount: {
            type: Number,
            default: 0
        }
    },
    companyName: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

const userModel = mongoose.model('User', userSchema);
export default userModel;