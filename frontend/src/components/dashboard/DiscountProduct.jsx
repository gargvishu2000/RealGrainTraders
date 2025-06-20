import React from 'react'
import Title from '../Title'
import { Link } from 'react-router-dom'

const DiscountProduct = () => {
  // This will be replaced with actual discounted products in the future
  const comingSoon = true;
  
  return (
    <div className="container mx-auto px-4">
      <Title text1={"High"} text2={"Discounted Products"}/>
      
      {comingSoon ? (
        <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden border border-dashed border-blue-300">
          <div className="p-8 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Special Offers Coming Soon!</h3>
              <p className="text-gray-600 mb-4">
                We're preparing exclusive discounts on premium grain products for our valued customers.
                Be the first to know when our special offers go live!
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  Bulk Purchase Discounts
                </div>
                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  Seasonal Offers
                </div>
                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  Loyalty Rewards
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <Link 
                to="/subscribe" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 flex items-center"
              >
                Get Notified
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Example discount cards (placeholder) */}
          <div className="px-8 pb-8">
            <p className="text-sm text-gray-500 mb-4">Preview of upcoming discount offers:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-gray-50 rounded-lg p-4 border border-gray-100 animate-pulse">
                  <div className="h-32 bg-gray-200 rounded-md mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-8 bg-gray-200 rounded-full w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // This section will be used when actual discounted products are available
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Product cards will be mapped here in the future */}
          {/* Example of how a product card will look: */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="relative">
              <img 
                src="/placeholder-grain.jpg" 
                alt="Discounted Product" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 m-2 rounded-full font-bold">
                -25%
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">Premium Basmati Rice</h3>
              <p className="text-sm text-gray-600">Finest quality, long grain</p>
              <div className="mt-3 flex justify-between items-center">
                <div>
                  <span className="text-gray-400 line-through mr-2">₹2,400</span>
                  <span className="font-bold text-lg">₹1,800</span>
                </div>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DiscountProduct