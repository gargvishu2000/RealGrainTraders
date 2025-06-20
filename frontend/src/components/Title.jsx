import React from 'react'

const Title = ({ text1, text2, subtitle }) => {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex items-center gap-4'>
        {/* Left Line */}
        <div className='hidden sm:block w-12 h-[2px] bg-blue-600'></div>
        
        {/* Title Text */}
        <h2 className='text-2xl sm:text-3xl font-semibold tracking-wide'>
          <span className='text-gray-800'>{text1}</span>
          {text2 && (
            <span className='text-blue-600'> {text2}</span>
          )}
        </h2>
        
        {/* Right Line */}
        <div className='hidden sm:block w-12 h-[2px] bg-blue-600'></div>
      </div>

      {/* Optional Subtitle */}
      {subtitle && (
        <p className='mt-2 text-gray-600 text-sm sm:text-base'>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default Title