import React, { useContext, useState, useEffect } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { motion } from 'framer-motion'
import { FiPackage, FiTruck, FiCalendar, FiCreditCard, FiSearch, FiChevronRight, FiAlertCircle } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadOrderData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      if (!token) {
        setIsLoading(false)
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      
      if (response.data.success) {
        let allOrderItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            item['orderId'] = order._id
            allOrderItem.push(item)
          })
        })
        setOrderData(allOrderItem)
      } else {
        setError(response.data.message || 'Failed to load orders')
      }
    } catch (error) {
      console.log(error)
      setError('An error occurred while loading your orders')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setOrderData([]) // Clear previous data
    loadOrderData()
  }, [token])

  // Get status color and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case 'OrderPlaced':
        return { color: 'bg-blue-500', icon: <FiPackage className="text-blue-500" /> }
      case 'Packing':
        return { color: 'bg-yellow-500', icon: <FiPackage className="text-yellow-500" /> }
      case 'Ship':
        return { color: 'bg-purple-500', icon: <FiTruck className="text-purple-500" /> }
      case 'Out for delivery':
        return { color: 'bg-orange-500', icon: <FiTruck className="text-orange-500" /> }
      case 'Delivered':
        return { color: 'bg-green-500', icon: <FiPackage className="text-green-500" /> }
      default:
        return { color: 'bg-gray-500', icon: <FiPackage className="text-gray-500" /> }
    }
  }

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
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
        <Title text1={'MY'} text2={'ORDERS'} />
        <button 
          onClick={loadOrderData} 
          className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
        >
          <FiSearch />
          Refresh Orders
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-t-4 border-b-4 border-amber-600 rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <FiAlertCircle className="text-red-500 text-4xl mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-800 mb-2">Unable to load orders</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={loadOrderData}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : orderData.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiPackage className="text-gray-500 text-3xl" />
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">No orders yet</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            You haven't placed any orders yet. Browse our selection of high-quality grains and place your first order.
          </p>
          <Link 
            to="/grains"
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors inline-block"
          >
            Browse Grains
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orderData.map((item, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <FiCalendar className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-medium">{formatDate(item.date)}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <FiCreditCard className="text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Payment Method</p>
                      <p className="font-medium">{item.paymentMethod}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusInfo(item.status).icon}
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-medium">{item.status}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Content */}
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* Product Info */}
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                      {item.image && item.image[0] ? (
                        <img 
                          src={item.image[0]} 
                          alt={item.name} 
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/80?text=Grain';
                          }}
                        />
                      ) : (
                        <FiPackage className="text-gray-400 text-2xl" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{item.name}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-gray-600">
                        <p>{currency} {item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        {item.size && <p>Size: {item.size}</p>}
                      </div>
                    </div>
                  </div>
                  
                  {/* Status and Actions */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusInfo(item.status).color}`}></div>
                      <span className="text-sm font-medium">{item.status}</span>
                    </div>
                    <Link 
                      to={`/order/track/${item.orderId}`}
                      className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Track Order
                      <FiChevronRight />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default Orders
