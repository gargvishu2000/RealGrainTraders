import React, { useEffect, useState, useContext } from 'react'
import { assets } from '../assets/frontend_assets/assets.js'
import CartTotal from '../components/CartTotal'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import { FiShoppingBag, FiTrash2, FiArrowLeft, FiCreditCard } from 'react-icons/fi'
import { motion } from 'framer-motion'

const Cart = () => {
  const { grains, cart, updateQuantity, navigate } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])
  const [specialInstructions, setSpecialInstructions] = useState('')

  useEffect(() => {
    const temp = []
    cart.items?.forEach((item) => {
      temp.push({
        _id: item.grainId,
        quantity: item.quantity
      })
    })
    setCartData(temp)
  }, [cart, updateQuantity])

  const calculateSubtotal = (price, quantity) => {
    return price * quantity
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
    <div className='max-w-7xl mx-auto'>
      {cartData.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center py-20 bg-gray-50 rounded-xl my-8'
        >
          <img src={assets.empty_cart} alt="Empty Cart" className='w-40 mx-auto mb-6 opacity-60' />
          <h2 className='text-2xl font-semibold text-gray-700 mb-2'>Your bulk order cart is empty</h2>
          <p className='text-gray-500 mb-8 max-w-md mx-auto'>
            Looks like you haven't added any grains to your cart yet. 
            Browse our selection to find high-quality grains for your business.
          </p>
          <button 
            onClick={() => navigate('/grains')}
            className='bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2 mx-auto'
          >
            <FiShoppingBag />
            Browse Grains
          </button>
        </motion.div>
      ) : (
        <div className='py-8'>
          <div className='w-full'>
            {/* Cart Items Section */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className='w-full'
            >
              {/* Cart Headers */}
              <div className='hidden md:grid grid-cols-[3fr_1fr_1fr_1fr_0.5fr] gap-4 pb-4 border-b text-sm font-medium text-gray-600'>
                <div>Product</div>
                <div className='text-center'>Price/Ton</div>
                <div className='text-center'>Quantity</div>
                <div className='text-center'>Subtotal</div>
                <div></div>
              </div>

              {/* Cart Items */}
              {cartData.map((item, index) => {
                const productData = grains.find((grain) => grain._id === item._id)
                if (!productData) return null

                return (
                  <motion.div 
                    key={index} 
                    variants={itemVariants}
                    className='py-6 border-b text-gray-700 hover:bg-gray-50 transition-colors rounded-lg px-2'
                  >
                    <div className='grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr_1fr_0.5fr] gap-4 items-center'>
                      {/* Product Info */}
                      <div className='flex items-start gap-4'>
                        <div className='relative'>
                          <img 
                            src={productData.image && productData.image[0] ? productData.image[0] : assets.default_grain} 
                            className='w-24 h-24 object-cover rounded-lg shadow-sm' 
                            alt={productData.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = assets.default_grain || 'https://via.placeholder.com/150?text=Grain';
                            }}
                          />
                          <div className='absolute -top-2 -right-2 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full'>
                            Bulk
                          </div>
                        </div>
                        <div>
                          <h3 className='font-medium text-lg'>{productData.name}</h3>
                          <div className='text-sm text-gray-500 mt-1'>
                            <p>Type: {productData.type || 'Grain'}</p>
                            <p>Origin: {productData.origin || 'Domestic'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Price per Ton */}
                      <div className='md:text-center'>
                        <span className='md:hidden text-gray-500 mr-2'>Price/Ton: </span>
                        <span className='font-medium'>₹{productData.price.toLocaleString()}</span>
                      </div>

                      {/* Quantity Input */}
                      <div className='flex items-center'>
                        <span className='md:hidden text-gray-500 mr-2'>Quantity: </span>
                        <div className='flex items-center'>
                          <button 
                            onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                            className='px-3 py-1 border rounded-l-lg hover:bg-gray-100 text-gray-700 font-bold'
                          >
                            −
                          </button>
                          <input 
                            type="number"
                            min={1}
                            max={productData.quantity}
                            value={item.quantity}
                            onChange={(e) => {
                              const value = Number(e.target.value)
                              if (value >= 1 && value <= productData.quantity) {
                                updateQuantity(item._id, value)
                              }
                            }}
                            className='w-16 px-2 py-1 border-y text-center focus:outline-none focus:border-amber-500'
                          />
                          <button 
                            onClick={() => updateQuantity(item._id, Math.min(productData.quantity, item.quantity + 1))}
                            className='px-3 py-1 border rounded-r-lg hover:bg-gray-100 text-gray-700 font-bold'
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className='md:text-center'>
                        <span className='md:hidden text-gray-500 mr-2'>Subtotal: </span>
                        <span className='font-semibold text-amber-600'>
                          ₹{calculateSubtotal(productData.price, item.quantity).toLocaleString()}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <div className='flex justify-end'>
                        <button
                          onClick={() => updateQuantity(item._id, 0)}
                          className='text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors'
                          aria-label="Remove item"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Mobile Quantity Limits */}
                    <div className='md:hidden text-sm text-gray-500 mt-3 bg-gray-50 p-3 rounded-lg'>
                      <p>Minimum Order: 1 ton</p>
                      <p>Available: {productData.quantity} tons</p>
                    </div>
                  </motion.div>
                )
              })}

              {/* Continue Shopping Button */}
              <div className='mt-6'>
                <button 
                  onClick={() => navigate('/grains')}
                  className='flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium'
                >
                  <FiArrowLeft />
                  Continue Shopping
                </button>
              </div>
            </motion.div>

            {/* Order Summary Section */}
            <div className='mt-8'>
              <CartTotal />
              <button 
                onClick={() => navigate('/place-order')}
                className='w-full mt-6 bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 font-medium'
              >
                <FiCreditCard />
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart