import React from 'react'
import { motion } from 'framer-motion'
import { assets } from '../assets/frontend_assets/assets.js'
import NewsletterBox from '../components/Newsletter.jsx'
import Title from '../components/Title'
import contactUs from '../assets/contact.png'
import iso from '../assets/iso.png'
import agmark from '../assets/agmark.png'
import fssai from '../assets/fssai.png'
import { NavLink } from 'react-router-dom'

const About = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  // Company stats
  const stats = [
    { value: '1000+', label: 'Successful Orders' },
    { value: '15+', label: 'Grain Varieties' },
    { value: '98%', label: 'Customer Satisfaction' },
    { value: '24/7', label: 'Customer Support' }
  ];
  
  // Features with icons
  const features = [
    {
      icon: '🔍',
      title: 'Quality Assurance',
      description: 'Every grain product undergoes thorough quality checks and certification before being listed for sale.'
    },
    {
      icon: '🚚',
      title: 'Direct Delivery',
      description: 'Skip the middlemen and get premium grains delivered directly from our farm to your doorstep.'
    },
    {
      icon: '🔒',
      title: 'Secure Transactions',
      description: 'Our platform ensures secure payment processing and order tracking for peace of mind.'
    }
  ];

  return (
    <div className='pt-8 border-t'>
      {/* Hero Section */}
      <div className='container mx-auto px-4'>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Title text1={'ABOUT'} text2={'US'} subtitle="Premium Grain Products Direct to You"/>
        </motion.div>
        
        <motion.div 
          className='my-12 flex flex-col md:flex-row gap-16 items-center'
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.div 
            className='md:w-2/5'
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={contactUs} 
              className='w-full max-w-[500px] rounded-lg shadow-lg object-cover' 
              alt="About Real Grain Trader" 
            />
          </motion.div>
          
          <div className='flex flex-col justify-center gap-6 md:w-3/5 text-left'>
            <motion.p 
              className='text-lg text-gray-600 leading-relaxed'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className='text-2xl font-semibold text-amber-600'>Real Grain Trader</span> was established with a passion for delivering premium quality grains directly to consumers. As the sole supplier, I personally ensure that every product meets the highest standards of quality and freshness.
            </motion.p>
            
            <motion.p 
              className='text-lg text-gray-600 leading-relaxed'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              My journey began with a simple mission: to provide customers with access to premium grain products without the markups of traditional retail chains. Today, I offer a wide variety of grains including wheat, rice, barley, and more—all sourced and handled with care to ensure exceptional quality.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className='text-xl font-bold text-gray-800 mb-3 border-l-4 border-amber-500 pl-3'>My Commitment</h3>
              <p className='text-lg text-gray-600 leading-relaxed'>
                As your dedicated grain supplier, I'm committed to providing you with the finest quality products, transparent pricing, and exceptional customer service. Every order is personally overseen to ensure you receive nothing but the best.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Stats Section */}
      <motion.div 
        className='bg-gradient-to-r from-amber-50 to-amber-100 py-16 my-12'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className='flex flex-col items-center'
              >
                <span className='text-4xl font-bold text-amber-600 mb-2'>{stat.value}</span>
                <span className='text-gray-600'>{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Why Choose Us Section */}
      <div className='container mx-auto px-4 my-16'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mb-12'
        >
          <Title text1={'WHY'} text2={'CHOOSE US'} subtitle="Benefits of ordering from Real Grain Trader"/>
        </motion.div>
        
        <motion.div 
          className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-20'
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={fadeIn}
              whileHover={{ y: -10 }}
              className='bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300'
            >
              <div className='p-8'>
                <div className='w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <span className='text-2xl'>{feature.icon}</span>
                </div>
                <h3 className='text-xl font-semibold text-center mb-4'>{feature.title}</h3>
                <p className='text-gray-600 text-center'>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Certifications Section */}
      <motion.div 
        className='bg-gray-50 py-16'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='mb-12 text-center'
          >
            <h2 className='text-2xl font-semibold mb-4'>Quality Certifications</h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              All products are certified to meet the highest industry standards, ensuring premium quality in every purchase.
            </p>
          </motion.div>
          
          <div className='flex flex-wrap justify-center items-center gap-12'>
            <motion.img 
              src={fssai} 
              alt="FSSAI" 
              className='h-16 md:h-20' 
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            />
            <motion.img 
              src={agmark} 
              alt="Agmark" 
              className='h-16 md:h-20' 
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            />
            <motion.img 
              src={iso} 
              alt="ISO" 
              className='h-16 md:h-20' 
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            />
          </div>
        </div>
      </motion.div>
      
      {/* My Story Section */}
      <div className='container mx-auto px-4 my-16'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mb-12'
        >
          <Title text1={'MY'} text2={'STORY'} subtitle="The journey behind Real Grain Trader"/>
        </motion.div>
        
        <motion.div 
          className='flex flex-col md:flex-row gap-12 items-center mb-20'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className='md:w-1/2'>
            <motion.img 
              src={assets.person1 || contactUs} 
              alt="Founder" 
              className='w-full rounded-lg shadow-lg'
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            />
          </div>
          
          <motion.div 
            className='md:w-1/2 flex flex-col gap-6'
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className='text-2xl font-bold text-gray-800'>From Farm to Your Table</h3>
            <p className='text-lg text-gray-600 leading-relaxed'>
              Growing up in a farming family, I developed a deep appreciation for quality agricultural products. After years of seeing how traditional supply chains added unnecessary costs and compromised quality, I decided to create a direct-to-consumer model.
            </p>
            <p className='text-lg text-gray-600 leading-relaxed'>
              Real Grain Trader was born from this vision—a platform where I could personally ensure the quality of every product while offering fair prices to consumers. Today, I'm proud to personally oversee every aspect of the business, from sourcing to delivery.
            </p>
            <p className='text-lg text-gray-600 leading-relaxed'>
              My commitment to quality and customer satisfaction remains at the heart of everything I do. When you order from Real Grain Trader, you're not just getting premium grains—you're getting my personal guarantee of excellence.
            </p>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Call to Action */}
      <motion.div 
        className='bg-amber-50 py-16 mb-16'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className='container mx-auto px-4 text-center'>
          <motion.h2 
            className='text-3xl font-bold mb-6'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Experience Premium Quality?
          </motion.h2>
          <motion.p 
            className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Browse my selection of premium grain products and taste the difference
          </motion.p>
          <motion.button 
            className='bg-amber-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <NavLink to="/">
            Shop Now
            </NavLink>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default About