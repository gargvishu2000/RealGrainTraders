import React, { useState, useEffect, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import { useNavigate } from 'react-router-dom'

const LatestGrainListings = () => {
    const { products } = useContext(ShopContext)
    const [latestGrains, setLatestGrains] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        // Sort products by listing date and get latest 8
        const sortedGrains = [...products].sort((a, b) => 
            new Date(b.listedDate) - new Date(a.listedDate)
        ).slice(0, 8)
        setLatestGrains(sortedGrains)
    }, [products])

    return (
        <div className='my-16 container mx-auto px-4'>
            <div className='text-center mb-12'>
                <Title text1={'LATEST'} text2={'GRAIN LISTINGS'} />
                <p className='max-w-2xl mx-auto mt-4 text-gray-600'>
                    Fresh grain listings from verified suppliers across India. 
                    Updated daily with current market prices and availability.
                </p>
            </div>

            {/* Grain Listings Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {latestGrains.map((grain, index) => (
                    <div 
                        key={index}
                        onClick={() => navigate(`/grain/${grain._id}`)}
                        className='bg-white rounded-lg border hover:shadow-lg transition-shadow cursor-pointer'
                    >
                        <div className='relative'>
                            <img 
                                src={grain.image} 
                                alt={grain.name}
                                className='w-full h-48 object-cover rounded-t-lg'
                            />
                            <div className='absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded text-sm'>
                                New Listing
                            </div>
                            {grain.qualityGrade && (
                                <div className='absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded text-sm'>
                                    {grain.qualityGrade}
                                </div>
                            )}
                        </div>

                        <div className='p-4'>
                            <div className='flex justify-between items-start mb-2'>
                                <h3 className='font-medium'>{grain.name}</h3>
                                <span className='text-xs text-gray-500'>
                                    {new Date(grain.listedDate).toLocaleDateString()}
                                </span>
                            </div>

                            <div className='space-y-2 text-sm'>
                                <div className='grid grid-cols-2 gap-2'>
                                    <div>
                                        <p className='text-gray-500'>Price/Ton</p>
                                        <p className='font-medium'>₹{grain.pricePerTon.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className='text-gray-500'>Available</p>
                                        <p className='font-medium'>{grain.availableQuantity} tons</p>
                                    </div>
                                </div>

                                <div className='flex items-center justify-between text-sm'>
                                    <span className='text-gray-500'>Origin: {grain.origin}</span>
                                    <span className='text-gray-500'>MOQ: {grain.minOrderQuantity}t</span>
                                </div>

                                {grain.certifications && (
                                    <div className='flex flex-wrap gap-2 pt-2'>
                                        {grain.certifications.map((cert, idx) => (
                                            <span 
                                                key={idx}
                                                className='bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs'
                                            >
                                                {cert}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='px-4 pb-4'>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation()
                                    navigate(`/place-order/${grain._id}`)
                                }}
                                className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors'
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Market Summary */}
            <div className='mt-12 bg-gray-50 rounded-lg p-6'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center'>
                    <div>
                        <h4 className='font-medium text-gray-800'>New Listings Today</h4>
                        <p className='text-2xl font-semibold text-blue-600 mt-2'>24</p>
                    </div>
                    <div>
                        <h4 className='font-medium text-gray-800'>Average Price Change</h4>
                        <p className='text-2xl font-semibold text-green-600 mt-2'>+2.5%</p>
                    </div>
                    <div>
                        <h4 className='font-medium text-gray-800'>Total Available Volume</h4>
                        <p className='text-2xl font-semibold text-blue-600 mt-2'>12,500 tons</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LatestGrainListings

// data expected
// {
//     _id: string,
//     name: string,
//     image: string,
//     listedDate: Date,
//     pricePerTon: number,
//     availableQuantity: number,
//     minOrderQuantity: number,
//     qualityGrade: string,
//     origin: string,
//     certifications: string[]
// }