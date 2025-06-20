import React, { useState, useReducer } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/admin_assets/assets.js';
import { FiUpload, FiX } from 'react-icons/fi';

// Form reducer for better state management
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET_FORM':
      return initialFormState;
    default:
      return state;
  }
}

const initialFormState = {
  name: '',
  type: '',
  quantity: 0,
  price: 0,
  unit: '',
  grade: '',
  supplier: '',
  status: 'Available'
};

const Add = ({ token }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Image states
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  
  // Form state using reducer
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  
  // Available grain types from the model
  const grainTypes = ['Wheat', 'Rice', 'Corn', 'Barley', 'Oats', 'Rye', 'Sorghum', 'Millet', 'Oil', 'Sugar', 'Ghee'];
  
  // Available grades
  const gradeOptions = ['Grade A', 'Grade B', 'Grade C', 'Ungraded'];
  
  // Available statuses
  const statusOptions = ['Available', 'Reserved', 'Sold', 'In Transit'];

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const processedValue = type === 'number' ? Number(value) : value;
    dispatch({ type: 'SET_FIELD', field: name, value: processedValue });
  };

  // Handle image removal
  const removeImage = (imageNumber) => {
    switch (imageNumber) {
      case 1: setImage1(null); break;
      case 2: setImage2(null); break;
      case 3: setImage3(null); break;
      case 4: setImage4(null); break;
      default: break;
    }
  };

  // Form submission handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    // Validate at least one image is selected
    if (!image1 && !image2 && !image3 && !image4) {
      toast.error('Please upload at least one product image');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      
      // Append all form fields
      Object.entries(formState).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      // Append images if they exist
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);
      
      const response = await axios.post(`${backendUrl}/api/grains/`, formData, { 
        headers: { token }
      });
      
      if (response.data.success) {
        toast.success(response.data.message);
        
        // Reset form
        dispatch({ type: 'RESET_FORM' });
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error(error.response?.data?.message || 'Failed to add product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>
      
      <form onSubmit={onSubmitHandler} className="space-y-6">
        {/* Image Upload Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Product Images <span className="text-red-500">*</span>
          </label>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Image 1 */}
            <div className="relative">
              <label htmlFor="image1" className="block w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                {image1 ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={URL.createObjectURL(image1)} 
                      alt="Product preview" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button 
                      type="button"
                      onClick={(e) => { e.preventDefault(); removeImage(1); }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <FiUpload className="text-gray-400 mb-1" size={20} />
                    <span className="text-xs text-gray-500">Main Image</span>
                  </div>
                )}
                <input 
                  type="file" 
                  id="image1" 
                  accept="image/*"
                  className="hidden" 
                  onChange={(e) => setImage1(e.target.files[0])} 
                />
              </label>
            </div>
            
            {/* Image 2 */}
            <div className="relative">
              <label htmlFor="image2" className="block w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                {image2 ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={URL.createObjectURL(image2)} 
                      alt="Product preview" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button 
                      type="button"
                      onClick={(e) => { e.preventDefault(); removeImage(2); }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <FiUpload className="text-gray-400 mb-1" size={20} />
                    <span className="text-xs text-gray-500">Image 2</span>
                  </div>
                )}
                <input 
                  type="file" 
                  id="image2" 
                  accept="image/*"
                  className="hidden" 
                  onChange={(e) => setImage2(e.target.files[0])} 
                />
              </label>
            </div>
            
            {/* Image 3 */}
            <div className="relative">
              <label htmlFor="image3" className="block w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                {image3 ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={URL.createObjectURL(image3)} 
                      alt="Product preview" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button 
                      type="button"
                      onClick={(e) => { e.preventDefault(); removeImage(3); }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <FiUpload className="text-gray-400 mb-1" size={20} />
                    <span className="text-xs text-gray-500">Image 3</span>
                  </div>
                )}
                <input 
                  type="file" 
                  id="image3" 
                  accept="image/*"
                  className="hidden" 
                  onChange={(e) => setImage3(e.target.files[0])} 
                />
              </label>
            </div>
            
            {/* Image 4 */}
            <div className="relative">
              <label htmlFor="image4" className="block w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                {image4 ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={URL.createObjectURL(image4)} 
                      alt="Product preview" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button 
                      type="button"
                      onClick={(e) => { e.preventDefault(); removeImage(4); }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <FiUpload className="text-gray-400 mb-1" size={20} />
                    <span className="text-xs text-gray-500">Image 4</span>
                  </div>
                )}
                <input 
                  type="file" 
                  id="image4" 
                  accept="image/*"
                  className="hidden" 
                  onChange={(e) => setImage4(e.target.files[0])} 
                />
              </label>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">Upload at least one product image (max 4)</p>
        </div>
        
        {/* Product Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Enter product name"
              required
            />
          </div>
          
          {/* Product Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Product Type <span className="text-red-500">*</span>
            </label>
            <select 
              id="type"
              name="type"
              value={formState.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            >
              <option value="">Select type</option>
              {grainTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          {/* Quantity */}
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input 
              type="number" 
              id="quantity"
              name="quantity"
              value={formState.quantity}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          
          {/* Unit */}
          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
              Unit <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="unit"
              name="unit"
              value={formState.unit}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="kg, ton, etc."
              required
            />
          </div>
          
          {/* Grade */}
          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
              Grade <span className="text-red-500">*</span>
            </label>
            <select 
              id="grade"
              name="grade"
              value={formState.grade}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            >
              <option value="">Select grade</option>
              {gradeOptions.map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>
          
          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price (₹) <span className="text-red-500">*</span>
            </label>
            <input 
              type="number" 
              id="price"
              name="price"
              value={formState.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          
          {/* Supplier */}
          <div>
            <label htmlFor="supplier" className="block text-sm font-medium text-gray-700 mb-1">
              Supplier
            </label>
            <input 
              type="text" 
              id="supplier"
              name="supplier"
              value={formState.supplier}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Supplier name"
            />
          </div>
          
          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <select 
              id="status"
              name="status"
              value={formState.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button 
            type="submit" 
            className={`px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                Adding...
              </div>
            ) : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;