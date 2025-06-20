
import React from 'react'
import { assets } from '../assets/admin_assets/assets.js';

const Navbar = ({token, setToken}) => {
  return (
    <div className='flex items-center justify-between'>
        <img src={assets.logo} className='w-[max(10%,80px)] ml-20' alt="" />
        <button onClick={()=>setToken('')} className='bg-gray-700 text-white py-2 px-4 sm:px-6 sm:py-7 rounded-full text-xs sm:text-sm mr-20'>Logout</button>
    </div>
  )
}

export default Navbar
