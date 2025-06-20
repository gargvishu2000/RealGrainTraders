import React from 'react'
import FeaturedGrains from '../components/dashboard/FeaturedGrains'
import TradingStats from '../components/dashboard/Tradingstats'
import QualityAssurance from '../components/dashboard/QualityAssurance'
import NewsletterBox from '../components/Newsletter'
import DiscountProduct from '../components/dashboard/DiscountProduct'
import Categories from '../components/dashboard/Categories'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='space-y-12'>
      {/* Market Overview Section - Enhanced but keeping original data */}
      <div className='bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col md:flex-row items-center'>
            <div className='md:w-1/2 mb-8 md:mb-0'>
              <h1 className='text-4xl font-bold mb-6'>Welcome to <strong>Jindal Store</strong></h1>
              <p className='text-xl mb-8'>Your trusted B2B platform for grains</p>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Link to="/grains" className='bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-block text-center'>
                  Browse Catalog
                </Link>
                <Link to="/contact" className='border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors inline-block text-center'>
                  Contact Sales
                </Link>
              </div>
            </div>
            <div className='md:w-1/2'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20'>
                  <h3 className='font-semibold mb-2'>Total Trading Volume</h3>
                  <p className='text-2xl'>₹24.5M</p>
                </div>
                <div className='bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20'>
                  <h3 className='font-semibold mb-2'>Active Customers</h3>
                  <p className='text-2xl'>250+</p>
                </div>
                <div className='bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20'>
                  <h3 className='font-semibold mb-2'>Available Category</h3>
                  <p className='text-2xl'>15 Types</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section - New */}
      <div className='container mx-auto px-4 py-8'>
        <h2 className='text-3xl font-bold text-center mb-12'>Why Retailers Choose Us</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center'>
            <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className='text-xl font-semibold mb-2'>Wholesale Pricing</h3>
            <p className='text-gray-600'>Get competitive prices with volume discounts for your retail business.</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center'>
            <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className='text-xl font-semibold mb-2'>Quality Guaranteed</h3>
            <p className='text-gray-600'>All products are tested and certified for the highest quality standards.</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center'>
            <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className='text-xl font-semibold mb-2'>Reliable Delivery</h3>
            <p className='text-gray-600'>Scheduled deliveries to ensure your store never runs out of stock.</p>
          </div>
        </div>
      </div>

      {/* Showing all the categories - Keeping original component */}
      <div className='container mx-auto px-4 py-8 bg-gray-50 rounded-xl'> 
        <h2 className='text-3xl font-bold mb-8 text-center'>Grain Categories</h2>
        <Categories />
      </div>

      {/* Featured Grains - Keeping original component */}
      <div className='container mx-auto px-4 py-8'>
        <h2 className='text-3xl font-bold mb-8 text-center'>Featured Products</h2>
        <FeaturedGrains />
      </div>

      {/* High Discounted Products - Keeping original component */}
      <div className='container mx-auto px-4 py-8 bg-blue-50 rounded-xl'>
        <h2 className='text-3xl font-bold mb-8 text-center'>Special Offers</h2>
        <DiscountProduct />
      </div>

      {/* Trading Statistics - Keeping original component */}
      <div className='bg-gray-50 py-12'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold mb-8 text-center'>Market Insights</h2>
          <TradingStats />
        </div>
      </div>

      {/* Testimonials Section - New */}
      <div className='container mx-auto px-4 py-12'>
        <h2 className='text-3xl font-bold mb-12 text-center'>What Our Retailers Say</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='bg-white p-6 rounded-lg shadow-md border border-gray-100'>
            <div className='flex items-center mb-4'>
              <div className='w-12 h-12 bg-blue-200 rounded-full mr-4'></div>
              <div>
                <h4 className='font-semibold'>Rajesh Kumar</h4>
                <p className='text-sm text-gray-500'>Grocery Store Owner</p>
              </div>
            </div>
            <p className='text-gray-600 italic'>"The quality of wheat and rice I receive is consistently excellent. My customers keep coming back for more."</p>
            <div className='flex text-blue-500 mt-3'>
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md border border-gray-100'>
            <div className='flex items-center mb-4'>
              <div className='w-12 h-12 bg-blue-200 rounded-full mr-4'></div>
              <div>
                <h4 className='font-semibold'>Priya Sharma</h4>
                <p className='text-sm text-gray-500'>Organic Food Store</p>
              </div>
            </div>
            <p className='text-gray-600 italic'>"The organic certification on all products makes it easy for me to maintain my store's standards. Great service!"</p>
            <div className='flex text-blue-500 mt-3'>
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md border border-gray-100'>
            <div className='flex items-center mb-4'>
              <div className='w-12 h-12 bg-blue-200 rounded-full mr-4'></div>
              <div>
                <h4 className='font-semibold'>Amit Patel</h4>
                <p className='text-sm text-gray-500'>Restaurant Chain Owner</p>
              </div>
            </div>
            <p className='text-gray-600 italic'>"Bulk ordering is seamless, and the delivery is always on time. This reliability helps me run my restaurants efficiently."</p>
            <div className='flex text-blue-500 mt-3'>
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quality Assurance - Keeping original component */}
      <div className='container mx-auto px-4 py-8'>
        <h2 className='text-3xl font-bold mb-8 text-center'>Our Quality Commitment</h2>
        <QualityAssurance />
      </div>

      {/* Call to Action - New */}
      <div className='bg-blue-700 text-white py-16 mb-8'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold mb-4'>Ready to Stock Your Store?</h2>
          <p className='text-xl mb-8 max-w-2xl mx-auto'>Join hundreds of retailers who trust us for their grain supply needs. Get started today with wholesale pricing.</p>
          <Link to="/login" className='bg-white text-blue-700 px-8 py-4 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-block text-lg'>
            Create Business Account
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Dashboard