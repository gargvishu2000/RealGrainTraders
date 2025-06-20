import React from 'react'
import Title from './Title'
import iso from '../assets/iso.png'
import agmark from '../assets/agmark.png'
import fssai from '../assets/fssai.png'

const TradingFeatures = () => {
  const features = [
    {
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Quality Assurance',
      description: 'Every grain lot tested and certified for quality standards',
      highlight: '100% Quality Guaranteed'
    },
    {
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Secure Payments',
      description: 'Multiple payment options with escrow protection',
      highlight: 'Trade with Confidence'
    },
    {
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Fast Processing',
      description: 'Quick verification and processing of all orders',
      highlight: '24-48 Hour Processing'
    },
    {
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '24/7 Support',
      description: 'Round-the-clock assistance for all trading needs',
      highlight: 'Always Available'
    }
  ]

  return (
    <div className='bg-gray-50 py-16'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <Title text1={'TRADING'} text2={'FEATURES'} />
          <p className='mt-4 text-gray-600 max-w-2xl mx-auto'>
            Experience secure and efficient grain trading with our comprehensive platform features
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <div 
              key={index}
              className='bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300'
            >
              <div className='flex flex-col items-center text-center'>
                <div className='mb-4 p-3 bg-blue-50 rounded-full'>
                  {feature.icon}
                </div>
                
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  {feature.title}
                </h3>
                
                <p className='text-gray-600 mb-3'>
                  {feature.description}
                </p>
                
                <span className='text-blue-600 text-sm font-medium'>
                  {feature.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className='mt-16 flex flex-wrap justify-center items-center gap-8 opacity-70'>
          <img src={fssai} alt="FSSAI" className='h-12' />
          <img src={iso} alt="ISO" className='h-12' />
          <img src={agmark} alt="Agmark" className='h-12' />
          {/* <img src="/certifications/apeda.png" alt="APEDA" className='h-12' /> */}
        </div>

        {/* CTA Section */}
        <div className='mt-16 text-center'>
          <button 
            onClick={() => window.location.href = '/register'}
            className='bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors'
          >
            Start Trading Now
          </button>
          <p className='mt-4 text-sm text-gray-600'>
            Join thousands of verified traders on India's trusted grain trading platform
          </p>
        </div>
      </div>
    </div>
  )
}

export default TradingFeatures