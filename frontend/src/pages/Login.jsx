import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiPhone, FiBriefcase, FiUserPlus, FiLogIn } from 'react-icons/fi';
import grainBg from '../assets/grainBg.png'; // You'll need to add this image to your assets

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyName: '',
    businessType: 'Buyer',
    phoneNumber: '',
  });

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(
          `${backendUrl}/api/users/register`, 
          formData,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Registration successful!');
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/users/login`, {
          email: formData.email,
          password: formData.password
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Login successful!');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true });
    }
    
    // Check URL for signup parameter
    const params = new URLSearchParams(window.location.search);
    if (params.get('signup') === 'true') {
      setCurrentState('Sign Up');
    }
  }, [token, navigate]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        duration: 0.5
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: currentState === 'Login' ? -20 : 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0, 
      x: currentState === 'Login' ? 20 : -20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="flex w-full max-w-5xl shadow-xl rounded-xl overflow-hidden bg-white">
        {/* Left side - Image and info */}
        <div className="hidden md:block w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/90 to-amber-800/90 z-10"></div>
          <img 
            src={grainBg} 
            alt="Grain background" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-20 flex flex-col justify-center h-full px-8 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">Welcome to GrainTrade</h2>
              <p className="mb-8 text-white/90">
                India's premier B2B grain trading platform connecting farmers, processors, and buyers in a transparent marketplace.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <FiUserPlus className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium">Business Verification</h3>
                    <p className="text-sm text-white/80">All businesses are verified for secure trading</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <FiBriefcase className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium">Wholesale Pricing</h3>
                    <p className="text-sm text-white/80">Access competitive wholesale grain prices</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Right side - Form */}
        <motion.div 
          className="w-full md:w-1/2 p-8 sm:p-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="mb-8 text-center">
            <motion.h2 
              className="text-3xl font-bold text-gray-800 mb-2"
              variants={itemVariants}
            >
              {currentState === 'Login' ? 'Sign In' : 'Create Account'}
            </motion.h2>
            <motion.p 
              className="text-gray-600"
              variants={itemVariants}
            >
              {currentState === 'Login' 
                ? 'Sign in to access your business account' 
                : 'Register your business to start trading'}
            </motion.p>
          </div>

          <AnimatePresence mode="wait">
            <motion.form 
              key={currentState}
              onSubmit={onSubmitHandler} 
              className="space-y-5"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {currentState === 'Sign Up' && (
                <>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      name="name"
                      onChange={handleInputChange} 
                      value={formData.name} 
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition" 
                      placeholder="Full Name" 
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiBriefcase className="text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      name="companyName"
                      onChange={handleInputChange} 
                      value={formData.companyName} 
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition" 
                      placeholder="Company Name" 
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiBriefcase className="text-gray-400" />
                    </div>
                    <select
                      name="businessType"
                      onChange={handleInputChange}
                      value={formData.businessType}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition appearance-none bg-white"
                      required
                    >
                      <option value="Buyer">Grain Buyer</option>
                      <option value="Supplier">Grain Supplier</option>
                    </select>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="text-gray-400" />
                    </div>
                    <input 
                      type="tel" 
                      name="phoneNumber"
                      onChange={handleInputChange} 
                      value={formData.phoneNumber} 
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition" 
                      placeholder="Phone Number" 
                      required
                    />
                  </div>
                </>
              )}

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input 
                  type="email" 
                  name="email"
                  onChange={handleInputChange} 
                  value={formData.email} 
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition" 
                  placeholder="Business Email" 
                  required
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input 
                  type="password" 
                  name="password"
                  onChange={handleInputChange} 
                  value={formData.password} 
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition" 
                  placeholder="Password" 
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                {currentState === 'Login' && (
                  <p className="text-amber-600 hover:text-amber-700 cursor-pointer">
                    Forgot Your Password?
                  </p>
                )}
                <div className="ml-auto">
                  {currentState === 'Login' ? (
                    <p className="text-amber-600 hover:text-amber-700 cursor-pointer" onClick={() => setCurrentState('Sign Up')}>
                      Create Business Account
                    </p>
                  ) : (
                    <p className="text-amber-600 hover:text-amber-700 cursor-pointer" onClick={() => setCurrentState('Login')}>
                      Already have an account? Login
                    </p>
                  )}
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-2 bg-amber-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-700 transition-colors ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                    {currentState === 'Login' ? 'Signing in...' : 'Creating account...'}
                  </>
                ) : (
                  <>
                    {currentState === 'Login' ? (
                      <>
                        <FiLogIn />
                        Sign In
                      </>
                    ) : (
                      <>
                        <FiUserPlus />
                        Create Account
                      </>
                    )}
                  </>
                )}
              </button>

              {currentState === 'Sign Up' && (
                <p className="text-xs text-center text-gray-500 mt-4">
                  By creating an account, you agree to our <span className="underline cursor-pointer text-amber-600">Terms of Service</span> and <span className="underline cursor-pointer text-amber-600">Privacy Policy</span>.
                  <br />Your business information will be verified before activation.
                </p>
              )}
            </motion.form>
          </AnimatePresence>
          
          {/* Mobile view info section */}
          {currentState === 'Sign Up' && (
            <motion.div 
              className="mt-8 pt-8 border-t border-gray-200 md:hidden"
              variants={itemVariants}
            >
              <h3 className="text-lg font-medium text-gray-800 mb-4">Why join GrainTrade?</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <FiUserPlus className="text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Business Verification</h4>
                    <p className="text-sm text-gray-600">All businesses are verified for secure trading</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <FiBriefcase className="text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Wholesale Pricing</h4>
                    <p className="text-sm text-gray-600">Access competitive wholesale grain prices</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;