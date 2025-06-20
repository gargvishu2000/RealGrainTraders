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
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    }]
}, {
    timestamps: true,
    versionKey: false
});

// Add index for better search performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

const userModel = mongoose.model('User', userSchema);
export default userModel;