import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { FiPackage, FiTruck, FiCheck, FiClock, FiMapPin, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const OrderTracking = () => {
  const { orderId } = useParams();
  const { token, backendUrl } = useContext(ShopContext);
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrackingInfo = async () => {
      if (!token || !orderId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(`${backendUrl}/api/order/track/${orderId}`, {
          headers: { token }
        });

        if (response.data.success) {
          setTrackingInfo(response.data.trackingInfo);
        } else {
          setError(response.data.message || 'Failed to load tracking information');
          toast.error(response.data.message || 'Failed to load tracking information');
        }
      } catch (error) {
        console.error('Error fetching tracking info:', error);
        setError('An error occurred while loading tracking information');
        toast.error('An error occurred while loading tracking information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrackingInfo();
  }, [orderId, token, backendUrl]);

  // Get status color and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case 'Order Placed':
        return { color: 'bg-blue-500', icon: <FiPackage className="text-blue-500" /> };
      case 'Packing':
        return { color: 'bg-yellow-500', icon: <FiPackage className="text-yellow-500" /> };
      case 'Ship':
        return { color: 'bg-purple-500', icon: <FiTruck className="text-purple-500" /> };
      case 'Out for delivery':
        return { color: 'bg-orange-500', icon: <FiTruck className="text-orange-500" /> };
      case 'Delivered':
        return { color: 'bg-green-500', icon: <FiCheck className="text-green-500" /> };
      default:
        return { color: 'bg-gray-500', icon: <FiClock className="text-gray-500" /> };
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Pending';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto py-8 px-4"
    >
      <div className="mb-6">
        <Link to="/orders" className="flex items-center text-amber-600 hover:text-amber-700 transition-colors">
          <FiArrowLeft className="mr-2" />
          Back to Orders
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Order Tracking</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link 
            to="/orders" 
            className="inline-block bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Return to Orders
          </Link>
        </div>
      ) : trackingInfo ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Order Header */}
          <div className="bg-gray-50 p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Order #{trackingInfo.orderId}</h2>
                <p className="text-gray-600">Current Status: <span className="font-medium">{trackingInfo.status}</span></p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getStatusInfo(trackingInfo.status).color}`}></div>
                <span className="text-sm font-medium">{trackingInfo.paymentStatus}</span>
              </div>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Delivery Progress</h3>
            
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              {/* Timeline Items */}
              {trackingInfo.timeline.map((item, index) => (
                <div key={index} className="flex mb-8 relative">
                  {/* Status Icon */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                    item.completed 
                      ? 'bg-amber-100 text-amber-600 border-2 border-amber-600' 
                      : 'bg-gray-100 text-gray-400 border-2 border-gray-300'
                  }`}>
                    {getStatusInfo(item.status).icon}
                  </div>
                  
                  {/* Status Details */}
                  <div className="ml-4 flex-1">
                    <h4 className={`font-medium ${item.completed ? 'text-gray-800' : 'text-gray-500'}`}>
                      {item.status}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {item.completed ? formatDate(item.date) : 'Pending'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Information */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <FiMapPin className="mr-2" />
                  Current Location
                </h3>
                <p className="text-gray-700">{trackingInfo.currentLocation}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <FiClock className="mr-2" />
                  Estimated Delivery
                </h3>
                <p className="text-gray-700">{formatDate(trackingInfo.estimatedDelivery)}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-600 mb-4">No tracking information available for this order.</p>
          <Link 
            to="/orders" 
            className="inline-block bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Return to Orders
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default OrderTracking;