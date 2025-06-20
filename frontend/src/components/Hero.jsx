import React from 'react'
import { useNavigate } from 'react-router-dom'
import iso from '../assets/iso.png';
import agmark from '../assets/agmark.png';
import fssai from '../assets/fssai.png';

const Hero = () => {
  const navigate = useNavigate()

  return (
    <div className='relative bg-gradient-to-r from-blue-600 to-blue-800 text-white'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-10'>
        <img 
          src="/patterns/grain-pattern.png" 
          alt="" 
          className='w-full h-full object-cover'
        />
      </div>

      <div className='container mx-auto px-4'>
        <div className='grid md:grid-cols-2 gap-12 items-center py-16 md:py-24'>
          {/* Left Content */}
          <div className='relative z-10'>
            <div className='flex items-center gap-2 mb-6'>
              <div className='w-12 h-[2px] bg-blue-300'></div>
              <p className='text-blue-300 font-medium'>TRUSTED B2B PLATFORM</p>
            </div>

            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
              Trade Grains at 
              <span className='text-yellow-400'> Wholesale</span>
            </h1>

            <p className='text-lg text-blue-100 mb-8 max-w-xl'>
              Connect directly with verified suppliers and buyers. 
              Get real-time prices, quality assurance, and secure trading.
            </p>

            <div className='flex flex-wrap gap-4'>
              <button 
                onClick={() => navigate('/grains')}
                className='bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors'
              >
                Browse Grains
              </button>
              <button 
                onClick={() => navigate('/become-supplier')}
                className='border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors'
              >
                Become a Supplier
              </button>
            </div>

            {/* Trading Stats */}
            <div className='grid grid-cols-3 gap-8 mt-12'>
              <div>
                <p className='text-2xl md:text-3xl font-bold'>₹24.5M</p>
                <p className='text-blue-200 text-sm'>Daily Volume</p>
              </div>
              <div>
                <p className='text-2xl md:text-3xl font-bold'>250+</p>
                <p className='text-blue-200 text-sm'>Active Traders</p>
              </div>
              <div>
                <p className='text-2xl md:text-3xl font-bold'>15+</p>
                <p className='text-blue-200 text-sm'>Grain Types</p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className='relative z-10 hidden md:block'>
            <div className='relative'>
              <img 
                src="/images/grain-trading.png" 
                alt="Grain Trading" 
                className='w-full rounded-lg shadow-2xl'
              />
              
              {/* Floating Stats Card */}
              <div className='absolute -bottom-6 -left-6 bg-white text-gray-800 p-6 rounded-lg shadow-xl'>
                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center'>
                    <span className='text-green-600 text-xl'>↗</span>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Today's Trading</p>
                    <p className='text-lg font-semibold'>+12.5% Volume</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className='relative z-10 flex flex-wrap justify-center gap-8 pb-16 opacity-90'>
          <img src={fssai} alt="FSSAI" className='h-12' />
          <img src={agmark} alt="Agmark" className='h-12' />
          <img src={iso} alt="ISO" className='h-12' />
          {/* <img src="/certifications/apeda.png" alt="APEDA" className='h-12' /> */}
        </div>
      </div>
    </div>
  )
}

export default Hero