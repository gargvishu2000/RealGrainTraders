import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/frontend_assets/assets.js';
import GrainCard from '../components/GrainCard';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import { FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { BsSortDown, BsSortUp } from 'react-icons/bs';

const GrainListing = () => {
  const { grains } = useContext(ShopContext);
  
  const [showFilter, setShowFilter] = useState(true); // Set to true by default
  const [filterProducts, setFilterProducts] = useState([]);
  
  const [grainType, setGrainType] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortType, setSortType] = useState('relevant');
  const [isLoading, setIsLoading] = useState(true);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Available grain types
  const availableGrainTypes = [
    'Rice', 
    'Wheat', 
    'Oil', 
    'Dal', 
    'Sugar', 
    'Atta', 
    'Spices'
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    applyFilter();
  }, [grainType, priceRange, grains]);

  useEffect(() => {
    sortProduct();
  }, [sortType, filterProducts]);

  const toggleSelection = (value, setter) => {
    setter(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };

  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(e.target.value);
    setPriceRange(newRange);
  };

  const applyFilter = () => {
    let filtered = grains.slice();
    
    if (grainType.length > 0) {
      filtered = filtered.filter(item => grainType.includes(item.type));
    }
    
    // Apply price range filter
    filtered = filtered.filter(item => 
      item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    setFilterProducts(filtered);
  };

  const sortProduct = () => {
    let sorted = [...filterProducts];

    switch (sortType) {
      case 'low-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'popularity':
        sorted.sort((a, b) => b.popularity - a.popularity);
        break;
      default:
        return;
    }

    setFilterProducts(sorted);
  };

  const clearFilters = () => {
    setGrainType([]);
    setPriceRange([0, 10000]);
    setSortType('relevant');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className='flex flex-col sm:flex-row gap-1 sm:gap-6 pt-10 border-t'
    >
      {/* Filter Options */}
      <div className='min-w-52 max-w-52 bg-white rounded-lg shadow-sm p-4'>
        <div className="flex justify-between items-center mb-4">
          <p className='text-xl font-medium flex items-center gap-2'>
            <FiFilter className="text-amber-600" />
            FILTERS
          </p>
          <button 
            onClick={() => setShowFilter(!showFilter)} 
            className='sm:hidden text-gray-500'
          >
            {showFilter ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          <button 
            onClick={clearFilters}
            className="text-xs text-amber-600 hover:text-amber-700 hidden sm:block"
          >
            Clear All
          </button>
        </div>

        {/* Grain Type filter */}
        <div className={`border border-gray-200 rounded-lg p-4 mt-4 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-lg font-medium'>Product Type</p>
          <div className="flex flex-col gap-2">
            {availableGrainTypes.map(type => (
              <div key={type} className='flex items-center gap-2'>
                <input 
                  type="checkbox" 
                  id={`type-${type}`}
                  className='w-4 h-4 accent-amber-600' 
                  value={type} 
                  checked={grainType.includes(type)}
                  onChange={(e) => toggleSelection(e.target.value, setGrainType)} 
                />
                <label htmlFor={`type-${type}`} className="text-gray-700 cursor-pointer">{type}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range filter */}
        <div className={`border border-gray-200 rounded-lg p-4 my-4 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-lg font-medium'>Price Range</p>
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="10000" 
              step="100"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              className="w-full accent-amber-600"
            />
            <input 
              type="range" 
              min="0" 
              max="10000" 
              step="100"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              className="w-full accent-amber-600"
            />
            <div className="flex gap-2 mt-2">
              <input 
                type="number" 
                value={priceRange[0]} 
                onChange={(e) => handlePriceChange(e, 0)}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                min="0"
                max={priceRange[1]}
              />
              <span className="flex items-center text-gray-500">to</span>
              <input 
                type="number" 
                value={priceRange[1]} 
                onChange={(e) => handlePriceChange(e, 1)}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                min={priceRange[0]}
                max="10000"
              />
            </div>
          </div>
        </div>

        {/* Mobile Clear Filters */}
        <div className={`mt-4 ${showFilter ? '' : 'hidden'} sm:hidden`}>
          <button 
            onClick={clearFilters}
            className="w-full py-2 text-center text-amber-600 border border-amber-600 rounded-lg hover:bg-amber-50"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
          {/* Product Sort */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2 bg-white">
            <span className="text-gray-600 text-sm hidden sm:inline">Sort by:</span>
            <select 
              onChange={(e) => setSortType(e.target.value)} 
              value={sortType}
              className='border-none text-sm focus:ring-0 focus:outline-none bg-transparent'
            >
              <option value="relevant">Relevance</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="popularity">Popularity</option>
            </select>
            {sortType.includes('high') ? 
              <BsSortUp className="text-amber-600" /> : 
              <BsSortDown className="text-amber-600" />
            }
          </div>
        </div>

        {/* Results Summary */}
        <div className="bg-gray-50 p-3 rounded-lg mb-6 flex justify-between items-center">
          <p className="text-gray-600 text-sm">
            Showing <span className="font-medium">{filterProducts.length}</span> products
            {grainType.length > 0 && (
              <span> in <span className="font-medium">{grainType.join(', ')}</span></span>
            )}
          </p>
          <button 
            onClick={() => setShowFilter(!showFilter)}
            className="sm:hidden text-amber-600 text-sm font-medium"
          >
            {showFilter ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Map Products */}
        {filterProducts.length > 0 ? (
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
          >
            {filterProducts.map((grain, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                transition={{ delay: index * 0.05 }}
                className="h-full"
              >
                <GrainCard grain={grain} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <img src={assets.empty_cart || '/empty-results.svg'} alt="No results" className="w-32 h-32 mb-4 opacity-50" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6 max-w-md">
              We couldn't find any products matching your current filters. Try adjusting your search criteria.
            </p>
            <button 
              onClick={clearFilters}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination - if needed */}
        {filterProducts.length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                &laquo;
              </button>
              <button className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center">
                1
              </button>
              <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                2
              </button>
              <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                3
              </button>
              <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                &raquo;
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default GrainListing;