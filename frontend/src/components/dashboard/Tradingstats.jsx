import React, { useState, useEffect } from 'react'
import Title from '../Title'
import { motion } from 'framer-motion'

const TradingStats = () => {
  const [stats, setStats] = useState([
    {
      label: 'Total Trades',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      icon: 'chart-bar',
      description: 'Completed transactions across all markets'
    },
    {
      label: 'Trading Volume',
      value: '₹24.5M',
      change: '+8%',
      trend: 'up',
      icon: 'currency-rupee',
      description: 'Total value of goods traded this month'
    },
    {
      label: 'Active Orders',
      value: '156',
      change: '-3%',
      trend: 'down',
      icon: 'clipboard-list',
      description: 'Currently open buy and sell orders'
    },
    {
      label: 'New Suppliers',
      value: '45',
      change: '+15%',
      trend: 'up',
      icon: 'users',
      description: 'Suppliers onboarded in the last 30 days'
    }
  ])

  // Animation variants for the cards
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  // Function to render the appropriate icon
  const renderIcon = (iconName) => {
    switch(iconName) {
      case 'chart-bar':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
        )
      case 'currency-rupee':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 5a1 1 0 100 2h1a2 2 0 012 2v1H7a1 1 0 100 2h3v1a2 2 0 01-2 2H7a1 1 0 100 2h1a4 4 0 004-4v-1h1a1 1 0 100-2h-1V9a4 4 0 00-4-4H7z" clipRule="evenodd" />
          </svg>
        )
      case 'clipboard-list':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
        )
      case 'users':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
        )
      default:
        return null
    }
  }

  // Simulated data update (in a real app, this would fetch from an API)
  useEffect(() => {
    const timer = setTimeout(() => {
      // This simulates a data refresh - in a real app, you'd fetch from an API
      setStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          // Keep the same data for this demo
        }))
      )
    }, 30000) // Refresh every 30 seconds
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='mb-12'>
      <Title text1={'TRADING'} text2={'STATISTICS'} />
      
      <motion.div 
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8'
        variants={container}
        initial="hidden"
        animate="show"
      >
        {stats.map((stat, index) => (
          <motion.div 
            key={index} 
            className='bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 relative overflow-hidden'
            variants={item}
            whileHover={{ y: -5 }}
          >
            {/* Background decoration */}
            <div className="absolute right-0 top-0 h-24 w-24 opacity-5">
              {renderIcon(stat.icon)}
            </div>
            
            {/* Icon and label */}
            <div className="flex items-center mb-4">
              <div className="mr-3 p-2 rounded-lg bg-blue-50">
                {renderIcon(stat.icon)}
              </div>
              <div>
                <h3 className='text-gray-600 text-sm font-medium'>{stat.label}</h3>
                <p className='text-xs text-gray-400'>{stat.description}</p>
              </div>
            </div>
            
            {/* Value */}
            <p className='text-3xl font-bold text-gray-800'>{stat.value}</p>
            
            {/* Change indicator */}
            <div className="flex items-center mt-3">
              <div className={`flex items-center ${
                stat.trend === 'up' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
              } px-2 py-1 rounded-full text-xs font-medium`}>
                {stat.trend === 'up' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v3.586l-4.293-4.293a1 1 0 00-1.414 0L8 10.586 3.707 6.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                  </svg>
                )}
                {stat.change}
              </div>
              <span className="text-xs text-gray-500 ml-2">from last month</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Optional: Add a "View detailed reports" button */}
      <div className="flex justify-center mt-8">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          View Detailed Reports
        </button>
      </div>
    </div>
  )
}

export default TradingStats