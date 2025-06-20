import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets.js";
import { FiPackage, FiTruck, FiRefreshCw, FiFilter, FiCalendar, FiCreditCard, FiUser, FiMapPin } from "react-icons/fi";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });
  const [expandedOrder, setExpandedOrder] = useState(null);
  
  const backendURl = import.meta.env.VITE_BACKEND_URL || "https://grain-app-backend.onrender.com";
  const currency = "₹";

  // Status options with icons and colors
  const statusOptions = [
    { value: "OrderPlaced", label: "Order Placed", icon: <FiPackage />, color: "bg-blue-100 text-blue-800" },
    { value: "Packing", label: "Packing", icon: <FiPackage />, color: "bg-yellow-100 text-yellow-800" },
    { value: "Ship", label: "Shipped", icon: <FiTruck />, color: "bg-purple-100 text-purple-800" },
    { value: "Out for delivery", label: "Out for Delivery", icon: <FiTruck />, color: "bg-orange-100 text-orange-800" },
    { value: "Delivered", label: "Delivered", icon: <FiPackage />, color: "bg-green-100 text-green-800" }
  ];

  const fetchAllOrders = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`${backendURl}/api/order/admin/all`, 
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
        setFilteredOrders(response.data.orders);
      } else {
        toast.error(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(error.response?.data?.message || "Network error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      const response = await axios.post(
        `${backendURl}/api/order/status`, 
        { orderId, status: newStatus }, 
        { headers: { token } }
      );
      
      if (response.data.success) {
        toast.success(`Order status updated to ${newStatus}`);
        // Update local state to avoid refetching
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        setFilteredOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        toast.error(response.data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(error.response?.data?.message || "Failed to update order status");
    }
  };

  // Format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Filter and sort orders
  useEffect(() => {
    let result = [...orders];
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(order => order.status === statusFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(order => 
        (order.address?.firstName?.toLowerCase().includes(lowercasedTerm) ||
        order.address?.lastName?.toLowerCase().includes(lowercasedTerm) ||
        order.address?.phone?.includes(searchTerm) ||
        order._id.toLowerCase().includes(lowercasedTerm) ||
        order.items.some(item => item.name.toLowerCase().includes(lowercasedTerm)))
      );
    }
    
    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        let aValue, bValue;
        
        // Handle nested properties and special cases
        if (sortConfig.key === "customerName") {
          aValue = `${a.address?.firstName || ''} ${a.address?.lastName || ''}`.trim().toLowerCase();
          bValue = `${b.address?.firstName || ''} ${b.address?.lastName || ''}`.trim().toLowerCase();
        } else if (sortConfig.key === "date") {
          aValue = a.date;
          bValue = b.date;
        } else {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
        }
        
        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredOrders(result);
  }, [orders, statusFilter, searchTerm, sortConfig]);

  // Initial data fetch
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  // Request sort function
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Get status display info
  const getStatusInfo = (status) => {
    const statusInfo = statusOptions.find(option => option.value === status) || 
      { icon: <FiPackage />, color: "bg-gray-100 text-gray-800", label: status };
    return statusInfo;
  };

  // Toggle order details expansion
  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
        <div className="flex items-center mt-4 sm:mt-0">
          <button 
            onClick={fetchAllOrders}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            <FiRefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, phone, or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Statuses</option>
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FiPackage className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No Orders Found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || statusFilter !== "all" 
              ? "Try changing your search or filter criteria" 
              : "There are no orders in the system yet"}
          </p>
          {(searchTerm || statusFilter !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200">
          {filteredOrders.map((order, index) => (
            <div 
              key={order._id || index}
              className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}
            >
              {/* Order Header - Always visible */}
              <div 
                className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 cursor-pointer"
                onClick={() => toggleOrderDetails(order._id)}
              >
                {/* Order ID and Date */}
                <div className="md:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-md ${getStatusInfo(order.status).color} flex items-center justify-center`}>
                      {getStatusInfo(order.status).icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 truncate">
                        Order #{order._id.substring(0, 8)}...
                      </p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <FiCalendar className="mr-1" size={14} />
                        {formatDate(order.date)}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Customer */}
                <div className="hidden md:block">
                  <div className="flex items-center">
                    <FiUser className="mr-2 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">
                        {order.address.firstName} {order.address.lastName}
                      </p>
                      <p className="text-xs text-gray-500">{order.address.phone}</p>
                    </div>
                  </div>
                </div>
                
                {/* Payment */}
                <div className="hidden md:block">
                  <div className="flex items-center">
                    <FiCreditCard className="mr-2 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">{currency}{order.amount}</p>
                      <div className="flex items-center">
                        <span className={`inline-block w-2 h-2 rounded-full mr-1 ${order.payment ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                        <p className="text-xs text-gray-500">{order.paymentMethod} - {order.payment ? "Paid" : "Pending"}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Status */}
                <div>
                  <select 
                    onChange={(event) => {
                      event.stopPropagation();
                      statusHandler(event, order._id);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    value={order.status} 
                    className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 ${getStatusInfo(order.status).color}`}
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Expanded Order Details */}
              {expandedOrder === order._id && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Order Items */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <FiPackage className="mr-2" />
                        Order Items ({order.items.length})
                      </h4>
                      <div className="bg-white rounded-md border border-gray-200 divide-y divide-gray-200">
                        {order.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="p-3 flex items-center gap-3">
                            {item.image ? (
                              <img 
                                src={item.image[0] || assets.parcel_icon} 
                                alt={item.name} 
                                className="w-12 h-12 object-cover rounded-md"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                                <FiPackage className="text-gray-400" />
                              </div>
                            )}
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <div className="flex justify-between text-sm text-gray-500">
                                <p>Qty: {item.quantity}</p>
                                {item.size && <p>Size: {item.size}</p>}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{currency}{item.price || 'N/A'}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Customer and Shipping Details */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <FiMapPin className="mr-2" />
                        Shipping Details
                      </h4>
                      <div className="bg-white rounded-md border border-gray-200 p-4">
                        <p className="font-medium text-gray-900 mb-2">
                          {order.address.firstName} {order.address.lastName}
                        </p>
                        <p className="text-gray-700 mb-1">{order.address.phone}</p>
                        <p className="text-gray-700 mb-1">{order.address.street}</p>
                        <p className="text-gray-700">
                          {order.address.cityName || order.address.city}, {order.address.state},{" "}
                          {order.address.country}, {order.address.zipcode}
                        </p>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex justify-between mb-2">
                            <p className="text-gray-600">Payment Method:</p>
                            <p className="font-medium">{order.paymentMethod}</p>
                          </div>
                          <div className="flex justify-between mb-2">
                            <p className="text-gray-600">Payment Status:</p>
                            <p className={`font-medium ${order.payment ? 'text-green-600' : 'text-yellow-600'}`}>
                              {order.payment ? "Paid" : "Pending"}
                            </p>
                          </div>
                          <div className="flex justify-between mb-2">
                            <p className="text-gray-600">Order Date:</p>
                            <p className="font-medium">{formatDate(order.date)}</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-gray-600">Total Amount:</p>
                            <p className="font-medium text-lg">{currency}{order.amount}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Order Count */}
      {!isLoading && filteredOrders.length > 0 && (
        <div className="mt-4 text-sm text-gray-500">
          Showing {filteredOrders.length} of {orders.length} orders
        </div>
      )}
    </div>
  );
};

export default Orders;