import React, { useContext, useState, useEffect } from 'react'
import { FiCreditCard, FiTruck, FiShield, FiCheckCircle, FiArrowLeft } from 'react-icons/fi'
import CartTotal from '../components/CartTotal'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod')
  const { navigate, backendUrl, token, cart, setCart, deliveryCharge } = useContext(ShopContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  // Check if cart is empty and redirect if needed
  useEffect(() => {
    if (!cart.items || cart.items.length === 0) {
      navigate('/cart')
      toast.info('Your cart is empty. Please add items before checkout.')
    }
  }, [cart, navigate])

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormData((data) => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      let orderItem = []
      cart.items.forEach(item => {
        orderItem.push(item)
      })
      
      let orderData = {
        address: JSON.stringify(formData),
        items: orderItem,
        amount: cart.totalAmount + deliveryCharge,
      }
      
      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + "/api/order/place", orderData, { headers: { token } })
          if (response.data.success) {
            setCart({})
            toast.success('Order placed successfully!')
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break
        default:
          toast.warning('Please select a payment method')
          break
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message || 'Failed to place order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto py-8"
    >
      <div className="flex items-center justify-between mb-8">
        <Title text1={'CHECKOUT'} text2={'DETAILS'} />
        <button 
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 text-amber-600 hover:text-amber-700"
        >
          <FiArrowLeft />
          Back to Cart
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Delivery Information */}
        <motion.div 
          variants={itemVariants}
          className="lg:w-3/5"
        >
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FiTruck className="text-amber-600" />
              Delivery Information
            </h2>
            
            <form id="delivery-form" onSubmit={onSubmitHandler}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input 
                    required 
                    id="firstName"
                    onChange={onChangeHandler} 
                    name="firstName" 
                    value={formData.firstName} 
                    type="text" 
                    placeholder="John" 
                    className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input 
                    required 
                    id="lastName"
                    onChange={onChangeHandler} 
                    name="lastName" 
                    value={formData.lastName} 
                    type="text" 
                    placeholder="Doe" 
                    className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  required 
                  id="email"
                  onChange={onChangeHandler} 
                  name="email" 
                  value={formData.email} 
                  type="email" 
                  placeholder="john.doe@example.com" 
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input 
                  required 
                  id="street"
                  onChange={onChangeHandler} 
                  name="street" 
                  value={formData.street} 
                  type="text" 
                  placeholder="123 Main St" 
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input 
                    required 
                    id="city"
                    onChange={onChangeHandler} 
                    name="city" 
                    value={formData.city} 
                    type="text" 
                    placeholder="Mumbai" 
                    className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input 
                    required 
                    id="state"
                    onChange={onChangeHandler} 
                    name="state" 
                    value={formData.state} 
                    type="text" 
                    placeholder="Maharashtra" 
                    className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                  <input 
                    required 
                    id="zipcode"
                    onChange={onChangeHandler} 
                    name="zipcode" 
                    value={formData.zipcode} 
                    type="number" 
                    placeholder="400001" 
                    className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input 
                    required 
                    id="country"
                    onChange={onChangeHandler} 
                    name="country" 
                    value={formData.country} 
                    type="text" 
                    placeholder="India" 
                    className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  required 
                  id="phone"
                  onChange={onChangeHandler} 
                  name="phone" 
                  value={formData.phone} 
                  type="number" 
                  placeholder="9876543210" 
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                />
              </div>
            </form>
          </div>
          
          {/* Trust Badges */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6"
          >
            <div className="flex flex-col items-center text-center p-4 border rounded-lg bg-white shadow-sm">
              <FiTruck className="text-amber-600 text-2xl mb-2" />
              <span className="text-sm font-medium">Fast Shipping</span>
              <span className="text-xs text-gray-500">2-3 business days</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 border rounded-lg bg-white shadow-sm">
              <FiShield className="text-amber-600 text-2xl mb-2" />
              <span className="text-sm font-medium">Secure Checkout</span>
              <span className="text-xs text-gray-500">Protected payment</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 border rounded-lg bg-white shadow-sm">
              <FiCheckCircle className="text-amber-600 text-2xl mb-2" />
              <span className="text-sm font-medium">Quality Guarantee</span>
              <span className="text-xs text-gray-500">Satisfaction assured</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Order Summary */}
        <motion.div 
          variants={itemVariants}
          className="lg:w-2/5"
        >
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FiCreditCard className="text-amber-600" />
                Payment Method
              </h2>
              
              <div className="space-y-4">
                <div 
                  onClick={() => setMethod('cod')} 
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    method === 'cod' ? 'border-amber-500 bg-amber-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    method === 'cod' ? 'border-amber-500' : 'border-gray-300'
                  }`}>
                    {method === 'cod' && <div className="w-3 h-3 rounded-full bg-amber-500"></div>}
                  </div>
                  <div>
                    <p className="font-medium">Cash On Delivery</p>
                    <p className="text-sm text-gray-500">Pay when you receive your order</p>
                  </div>
                </div>
                
          <div className="sticky top-24">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              <CartTotal />
            </div>
                
                {/* Commented payment methods can be uncommented when implemented */}
                {/* <div className="flex items-center p-4 border rounded-lg cursor-not-allowed opacity-60">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3"></div>
                  <div>
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-sm text-gray-500">Coming soon</p>
                  </div>
                </div> */}
              </div>
            </div>
            
            <button 
              type="submit"
              form="delivery-form"
              disabled={isSubmitting}
              className={`w-full bg-amber-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-amber-700 transition-colors'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <FiCreditCard />
                  Place Order
                </>
              )}
            </button>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              By placing your order, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default PlaceOrder