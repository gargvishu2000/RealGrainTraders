import React from 'react'
import Title from '../Title'
import agmark from '../../assets/agmark.png';
import iso from '../../assets/iso.png';
import fssai from '../../assets/fssai.png';
import { motion } from 'framer-motion';

const QualityAssurance = () => {
  const features = [
    {
      icon: '🔍',
      title: 'Quality Testing',
      description: 'Rigorous quality testing for all grain products',
      details: [
        'Moisture content analysis',
        'Foreign matter detection',
        'Pesticide residue testing',
        'Nutritional composition analysis'
      ]
    },
    {
      icon: '📜',
      title: 'Certifications',
      description: 'International quality certifications and standards',
      details: [
        'ISO 22000:2018 certified',
        'FSSAI approved processes',
        'AGMARK quality standards',
        'Global GAP compliance'
      ]
    },
    {
      icon: '🔒',
      title: 'Secure Storage',
      description: 'Temperature controlled warehousing facilities',
      details: [
        'Climate-controlled environments',
        'Pest prevention systems',
        'Inventory tracking technology',
        'Regular quality inspections'
      ]
    }
  ]

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const certificationVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5 
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { 
        duration: 0.3 
      }
    }
  };

  return (
    <div className='mb-12'>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
        We maintain the highest standards of quality throughout our supply chain, from sourcing to delivery.
        Every product undergoes rigorous testing to ensure premium quality.
      </p>
      
      <motion.div 
        className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-8'
        variants={container}
        initial="hidden"
        animate="show"
      >
        {features.map((feature, index) => (
          <motion.div 
            key={index} 
            className='bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300'
            variants={item}
            whileHover={{ y: -5 }}
          >
            <div className='p-6'>
              <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-2xl'>{feature.icon}</span>
              </div>
              <h3 className='font-semibold text-lg text-center mb-3'>{feature.title}</h3>
              <p className='text-gray-600 text-center mb-4'>{feature.description}</p>
              
              {/* Feature details */}
              <ul className='space-y-2 mt-4 bg-gray-50 p-4 rounded-lg'>
                {feature.details.map((detail, idx) => (
                  <li key={idx} className='flex items-start'>
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className='text-sm text-gray-700'>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Certification Badges */}
      <div className='mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8'>
        <h3 className='text-center font-semibold text-lg mb-6'>Our Certifications</h3>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
          We adhere to the highest industry standards and are proud to be certified by leading quality assurance organizations.
        </p>
        
        <div className='flex flex-wrap justify-center gap-8'>
          <motion.div
            className="bg-white p-4 rounded-lg shadow-sm"
            variants={certificationVariants}
            initial="hidden"
            animate="show"
            whileHover="hover"
          >
            <img src={iso} alt="ISO" className='h-16 mb-2' />
            <p className="text-xs text-center text-gray-500">ISO 22000:2018</p>
          </motion.div>
          
          <motion.div
            className="bg-white p-4 rounded-lg shadow-sm"
            variants={certificationVariants}
            initial="hidden"
            animate="show"
            whileHover="hover"
          >
            <img src={fssai} alt="FSSAI" className='h-16 mb-2' />
            <p className="text-xs text-center text-gray-500">Food Safety Authority</p>
          </motion.div>
          
          <motion.div
            className="bg-white p-4 rounded-lg shadow-sm"
            variants={certificationVariants}
            initial="hidden"
            animate="show"
            whileHover="hover"
          >
            <img src={agmark} alt="Agmark" className='h-16 mb-2' />
            <p className="text-xs text-center text-gray-500">Agricultural Quality</p>
          </motion.div>
        </div>
      </div>
      
      {/* Quality Commitment Section */}
      <div className="mt-12 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 p-6">
        <h3 className="text-center font-semibold text-lg mb-4">Our Quality Commitment</h3>
        
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
            <p className="text-gray-600 mb-4">
              At Grain App, we're committed to providing the highest quality grains to our customers. 
              Our comprehensive quality assurance program ensures that every product meets or exceeds 
              industry standards.
            </p>
            <p className="text-gray-600">
              We work directly with farmers who follow sustainable agricultural practices and 
              maintain strict quality control throughout the supply chain.
            </p>
          </div>
          
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-blue-600 font-bold text-xl mb-1">100%</div>
              <div className="text-sm text-gray-700">Quality Inspection</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-green-600 font-bold text-xl mb-1">24/7</div>
              <div className="text-sm text-gray-700">Storage Monitoring</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-purple-600 font-bold text-xl mb-1">3-Step</div>
              <div className="text-sm text-gray-700">Verification Process</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-yellow-600 font-bold text-xl mb-1">5-Star</div>
              <div className="text-sm text-gray-700">Quality Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QualityAssurance