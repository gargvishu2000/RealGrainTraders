import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets.js'
import { FiShoppingCart, FiPhone, FiTruck, FiShield, FiPackage, FiAward } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

const GrainProduct = () => {
  const { grainId } = useParams()
  const { addToCart, grains } = useContext(ShopContext)
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [price, setPrice] = useState(0)
  const [grainData, setGrainData] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    const grain = grains?.find(item => item._id === grainId)
    if (grain) {
      setGrainData(grain)
      setSelectedQuantity(grain.minOrderQuantity || 1)
      setPrice(grain.price || 0)
    }
  }, [grainId, grains])

  const handleAddToCart = useCallback(() => {
    addToCart(grainId, selectedQuantity, price)
  }, [grainId, selectedQuantity, price, addToCart])

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value)
    if (value < (grainData.minOrderQuantity || 1) || value > grainData.availableQuantity) {
      setErrorMessage(`Quantity must be between ${grainData.minOrderQuantity || 1} and ${grainData.availableQuantity} pack.`)
    } else {
      setErrorMessage('')
      setSelectedQuantity(value)
    }
  }

  if (!grainData) {
    return (
      <div className='flex justify-center items-center min-h-[60vh]'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600'></div>
      </div>
    )
  }

  // Create an array of all images
  const allImages = [
    ...(grainData.image || []),
    ...(grainData.additionalImages || [])
  ].filter(Boolean)

  return (
    <>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-amber-600">Home</a>
          <span className="mx-2">/</span>
          <a href="/grains" className="hover:text-amber-600">Grains</a>
          <span className="mx-2">/</span>
          <a href={`/grains?type=${grainData.type}`} className="hover:text-amber-600">{grainData.type}</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{grainData.name}</span>
        </nav>

        <div className='flex flex-col lg:flex-row gap-10'>
          {/* Left Side - Images */}
          <div className='lg:w-2/5'>
            <div className='border rounded-xl p-4 bg-white shadow-sm'>
              <img 
                src={allImages[selectedImage] || assets.default_grain} 
                alt={grainData.name || 'Grain Product'} 
                className='w-full h-[450px] object-cover rounded-lg transition-all duration-300'
              />
            </div>
            
            {allImages.length > 1 && (
              <div className='grid grid-cols-5 gap-2 mt-4'>
                {allImages.map((img, index) => (
                  <div 
                    key={index}
                    className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                      selectedImage === index ? 'border-amber-600 shadow-md' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={img} 
                      alt={`${grainData.name || 'Grain'} view ${index + 1}`}
                      className='w-full h-20 object-cover'
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Product Details */}
          <div className='lg:w-3/5'>
            <div className='bg-white rounded-xl shadow-sm p-6'>
              {/* Product Title and Status */}
              <div className='flex justify-between items-start'>
                <h1 className='text-3xl font-bold text-gray-800'>{grainData.name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  grainData.status 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {grainData.status ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              {/* Grade and Type */}
              <div className='flex gap-3 mt-2 mb-6'>
                {grainData.grade && (
                  <span className='bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium'>
                    Grade: {grainData.grade}
                  </span>
                )}
                {grainData.type && (
                  <span className='bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm font-medium'>
                    {grainData.type}
                  </span>
                )}
              </div>
              
              {/* Price */}
              <div className='border-t border-b py-4 my-6'>
                <div className='flex items-baseline'>
                  <span className='text-3xl font-bold text-amber-600'>₹{grainData.price}</span>
                  <span className='text-gray-600 ml-2'>/{grainData.unit || 'pack'}</span>
                </div>
                <p className='text-sm text-gray-500 mt-1'>
                  Inclusive of all taxes. Shipping calculated at checkout.
                </p>
              </div>
              
              {/* Key Details */}
              <div className='grid grid-cols-2 gap-6 mb-6'>
                <div>
                  <p className='text-gray-600 text-sm'>Minimum Order:</p>
                  <p className='font-medium'>{grainData.minOrderQuantity || 1} {'pack'}</p>
                </div>
                <div>
                  <p className='text-gray-600 text-sm'>Available Quantity:</p>
                  <p className='font-medium'>{grainData.quantity} {'pack'}</p>
                </div>
                <div>
                  <p className='text-gray-600 text-sm'>Harvest Date:</p>
                  <p className='font-medium'>{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className='text-gray-600 text-sm'>Origin:</p>
                  <p className='font-medium'>{grainData.origin || 'India'}</p>
                </div>
              </div>

              {/* Order Section */}
              <div className='bg-gray-50 p-5 rounded-xl mb-6'>
                <div className='flex items-center gap-4 mb-4'>
                  <label className='text-gray-700 font-medium'>Quantity:</label>
                  <div className='flex'>
                    <button 
                      onClick={() => setSelectedQuantity(prev => Math.max((grainData.minOrderQuantity || 1), prev - 1))}
                      className='bg-white border border-gray-300 px-3 py-2 rounded-l-lg hover:bg-gray-50'
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      min={grainData.minOrderQuantity || 1}
                      max={grainData.availableQuantity}
                      value={selectedQuantity}
                      onChange={handleQuantityChange}
                      className='border-y border-gray-300 px-3 py-2 w-20 text-center focus:outline-none'
                    />
                    <button 
                      onClick={() => setSelectedQuantity(prev => Math.min(grainData.availableQuantity, prev + 1))}
                      className='bg-white border border-gray-300 px-3 py-2 rounded-r-lg hover:bg-gray-50 font-medium text-gray-800 focus:outline-none active:bg-gray-100'
                    >
                      +
                    </button>
                  </div>
                  <span className='text-gray-500'>{grainData.unit || 'pack'}</span>
                </div>
                
                {errorMessage && (
                  <p className='text-red-500 text-sm mb-4 bg-red-50 p-2 rounded'>{errorMessage}</p>
                )}
                
                <div className='flex gap-4'>
                  <button 
                    onClick={handleAddToCart}
                    disabled={!grainData.status || errorMessage}
                    className='flex-1 bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2'
                  >
                    <FiShoppingCart />
                    Add to Cart
                  </button>
                  <NavLink to="/contact" className='flex-1 border border-amber-600 text-amber-600 py-3 rounded-lg hover:bg-amber-50 transition-colors flex items-center justify-center gap-2'>
                    <FiPhone />
                    Contact Supplier
                  </NavLink>
                </div>
              </div>

              {/* Supplier Info */}
              <div className='bg-white rounded-xl border p-5 mb-6'>
                <h3 className='text-lg font-semibold mb-3'>Supplier Information</h3>
                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold text-xl'>
                    {grainData.supplier?.charAt(0) || 'S'}
                  </div>
                  <div>
                    <p className='font-medium text-gray-800'>{grainData.supplier}</p>
                    <div className='flex items-center gap-2 text-sm text-gray-500'>
                      <span>Fatherpur, Beri</span>
                      <span className='w-1 h-1 bg-gray-400 rounded-full'></span>
                      <span>Member since 2022</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6'>
                <div className='flex flex-col items-center text-center p-3 border rounded-lg'>
                  <FiTruck className='text-amber-600 text-xl mb-2' />
                  <span className='text-sm text-gray-600'>Fast Shipping</span>
                </div>
                <div className='flex flex-col items-center text-center p-3 border rounded-lg'>
                  <FiShield className='text-amber-600 text-xl mb-2' />
                  <span className='text-sm text-gray-600'>Quality Assured</span>
                </div>
                <div className='flex flex-col items-center text-center p-3 border rounded-lg'>
                  <FiPackage className='text-amber-600 text-xl mb-2' />
                  <span className='text-sm text-gray-600'>Bulk Orders</span>
                </div>
                <div className='flex flex-col items-center text-center p-3 border rounded-lg'>
                  <FiAward className='text-amber-600 text-xl mb-2' />
                  <span className='text-sm text-gray-600'>Certified</span>
                </div>
              </div>

              {/* Certifications */}
              {grainData.certifications?.length > 0 && (
                <div className='mt-6'>
                  <h3 className='text-lg font-semibold mb-3'>Certifications</h3>
                  <div className='flex gap-2 flex-wrap'>
                    {grainData.certifications.map((cert, index) => (
                      <span 
                        key={index}
                        className='bg-gray-100 px-3 py-1 rounded-full text-sm'
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className='mt-12 bg-white rounded-xl shadow-sm p-6'>
          <h2 className='text-2xl font-bold mb-6'>Product Description</h2>
          <div className='prose max-w-none'>
            <p>
              {grainData.description || `${grainData.name} is a premium quality grain sourced directly from verified farmers. 
              This product meets the highest quality standards and is perfect for bulk orders.`}
            </p>
            
            {/* Additional description content would go here */}
            <h3 className='mt-6'>Specifications</h3>
            <ul>
              <li><strong>Type:</strong> {grainData.type}</li>
              <li><strong>Grade:</strong> {grainData.grade}</li>
              <li><strong>Origin:</strong> {grainData.origin || 'India'}</li>
              <li><strong>Harvest Season:</strong> {grainData.harvestSeason || 'Recent harvest'}</li>
              <li><strong>Moisture Content:</strong> {grainData.moistureContent || 'Standard'}</li>
            </ul>
          </div>
        </div>

        {/* Related Products would go here */}
      </div>
    </>
  )
}

export default GrainProduct
