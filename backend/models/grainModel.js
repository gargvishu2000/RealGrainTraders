import mongoose from 'mongoose';

const grainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Grain name is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Grain type is required'],
    enum: ['Wheat', 'Rice', 'Corn', 'Barley', 'Oats', 'Rye', 'Sorghum', 'Millet', 'Oil', 'Sugar','Ghee'],
    set: v => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase() // Capitalize first letter
  },
  image: {
    type:Array,
    required: [true, 'Grain image is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative']
  },
  unit: {
    type: String,
    required: true,
    set: v => v.toLowerCase() // Convert to lowercase
  },
  grade: {
    type: String,
    enum: ['Grade A', 'Grade B', 'Grade C', 'Ungraded'],
    default: 'Ungraded',
    set: v => v === 'A' ? 'Grade A' : (v === 'B' ? 'Grade B' : (v === 'C' ? 'Grade C' : v))
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  },
  supplier: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['Available', 'Reserved', 'Sold', 'In Transit'],
    default: 'Available',
    set: v => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase() // Capitalize first letter
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update the grain controller import
const Grain = mongoose.model('Grain', grainSchema);

export default Grain; 