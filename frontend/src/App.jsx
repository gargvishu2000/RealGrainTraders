import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import { ToastContainer } from 'react-toastify';

// Changed imports to reflect B2B grain platform pages
import Dashboard from './pages/Dashboard'
import GrainListing from './pages/GrainListing'
import About from './pages/About'
import Contact from './pages/Contact'
import GrainProduct from './pages/GrainProduct'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Verify from './pages/Verify'
import SupplierDirectory from './pages/SupplierDirectory'
import CategoryProduct from './pages/CategoryProduct'
import OrderTracking from './pages/OrderTracking'

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      {!isLoginPage && <Navbar />} 
      <Routes>
        {/* Updated routes for grain trading platform */}
        <Route path='/' element={<Dashboard />} />
        <Route path='/suppliers' element={<SupplierDirectory />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/grains/:grainId' element={<GrainProduct />} />
        <Route path='/grains' element={<GrainListing />} />
        <Route path='/products' element={<CategoryProduct /> } />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/order/track/:orderId' element={<OrderTracking />} />
      </Routes>
      {!isLoginPage && <Footer />}
    </div>
  )
}

export default App
