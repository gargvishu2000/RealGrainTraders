import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiTrash2, FiEdit, FiEye, FiSearch, FiRefreshCw } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const List = ({ token }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://grain-app-backend.onrender.com";
  
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/grains/`, { 
        headers: { token } 
      });
      
      if (response.data.success) {
        setList(response.data.grains);
      } else {
        toast.error(response.data.message || 'Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error(error.response?.data?.message || 'Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const removeGrain = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/grains/delete/${id}`, { 
        headers: { token } 
      });
      
      if (response.data.success) {
        toast.success(response.data.message || 'Product deleted successfully');
        setConfirmDelete(null);
        fetchList();
      } else {
        toast.error(response.data.message || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error(error.response?.data?.message || 'Error occurred while deleting');
    }
  };

  useEffect(() => {
    fetchList();
  }, [token, backendUrl]);

  // Sort function
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting and filtering
  const getFilteredAndSortedList = () => {
    // First filter by search term
    const filtered = list.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Then sort
    if (sortConfig.key) {
      return [...filtered].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filtered;
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredAndSortedList = getFilteredAndSortedList();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products Inventory</h1>
        <div className="flex items-center mt-4 sm:mt-0">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button 
            onClick={fetchList}
            className="p-2 text-gray-600 hover:text-amber-600 transition-colors"
            title="Refresh list"
          >
            <FiRefreshCw size={20} />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
        </div>
      ) : (
        <>
          {filteredAndSortedList.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'No products match your search' : 'No products available'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('name')}
                    >
                      Name {getSortIndicator('name')}
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('type')}
                    >
                      Type {getSortIndicator('type')}
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('quantity')}
                    >
                      Quantity {getSortIndicator('quantity')}
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('price')}
                    >
                      Price {getSortIndicator('price')}
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAndSortedList.map((item, index) => (
                    <tr key={item._id || index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex-shrink-0 h-12 w-12">
                          {item.image && item.image[0] ? (
                            <img 
                              className="h-12 w-12 rounded-md object-cover" 
                              src={item.image[0]} 
                              alt={item.name} 
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center text-gray-500">
                              No img
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        {item.grade && (
                          <div className="text-xs text-gray-500">{item.grade}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                          {item.type || 'Unspecified'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.quantity} {item.unit || 'units'}
                        </div>
                        {item.quantity < 10 && (
                          <div className="text-xs text-red-500 font-medium">Low stock</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div className="flex justify-center space-x-2">
                          <Link 
                            to={`/edit/${item._id}`} 
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit product"
                          >
                            <FiEdit size={18} />
                          </Link>
                          <Link 
                            to={`/view/${item._id}`} 
                            className="text-blue-600 hover:text-blue-900"
                            title="View details"
                          >
                            <FiEye size={18} />
                          </Link>
                          {confirmDelete === item._id ? (
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => removeGrain(item._id)}
                                className="text-red-600 hover:text-red-900 font-medium"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setConfirmDelete(null)}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDelete(item._id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete product"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredAndSortedList.length} of {list.length} products
          </div>
        </>
      )}
    </div>
  );
};

export default List;