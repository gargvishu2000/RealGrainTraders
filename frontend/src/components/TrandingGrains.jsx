import React, { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'
import Title from './Title'

const TrendingGrains = () => {
    const { products } = useContext(ShopContext)
    const [trendingGrains, setTrendingGrains] = useState([])

    useEffect(() => {
        // Filter trending grain products based on volume and recent trades
        const topGrains = products.filter((item) => (item.trending))
        setTrendingGrains(topGrains.slice(0, 4))
    }, [products])

    return (
        <div className='my-16 container mx-auto px-4'>
            <div className='text-center mb-12'>
                <Title text1={'TRENDING'} text2={'GRAINS'} />
                <p className='max-w-2xl mx-auto mt-4 text-gray-600'>
                    Most traded grain commodities based on market volume and recent transactions. 
                    Updated daily to reflect current market trends.
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {trendingGrains.map((item, index) => (
                    <div key={index} className='bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow'>
                        <div className='relative'>
                            <img 
                                src={item.image} 
                                alt={item.name}
                                className='w-full h-48 object-cover rounded-t-lg'
                            />
                            {item.qualityGrade && (
                                <span className='absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded text-sm'>
                                    {item.qualityGrade}
                                </span>
                            )}
                        </div>

                        <div className='p-4'>
                            <h3 className='font-medium text-lg mb-2'>{item.name}</h3>
                            
                            <div className='space-y-2 mb-4'>
                                <div className='flex justify-between text-sm'>
                                    <span className='text-gray-600'>Price/Ton:</span>
                                    <span className='font-medium'>₹{item.pricePerTon.toLocaleString()}</span>
                                </div>
                                
                                <div className='flex justify-between text-sm'>
                                    <span className='text-gray-600'>Origin:</span>
                                    <span>{item.origin}</span>
                                </div>

                                <div className='flex justify-between text-sm'>
                                    <span className='text-gray-600'>Available:</span>
                                    <span>{item.availableQuantity} tons</span>
                                </div>

                                <div className='flex justify-between text-sm'>
                                    <span className='text-gray-600'>Min. Order:</span>
                                    <span>{item.minOrderQuantity} tons</span>
                                </div>
                            </div>

                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    {item.certifications?.map((cert, idx) => (
                                        <span 
                                            key={idx}
                                            className='bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded'
                                        >
                                            {cert}
                                        </span>
                                    ))}
                                </div>
                                
                                <div className={`flex items-center gap-1 ${
                                    item.priceChange > 0 
                                        ? 'text-green-600' 
                                        : item.priceChange < 0 
                                        ? 'text-red-600' 
                                        : 'text-gray-600'
                                }`}>
                                    <span className='text-sm'>
                                        {item.priceChange > 0 ? '↑' : item.priceChange < 0 ? '↓' : '→'}
                                    </span>
                                    <span className='text-sm'>
                                        {Math.abs(item.priceChange)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Market Insights */}
            <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center'>
                <div className='p-6 bg-blue-50 rounded-lg'>
                    <h4 className='font-medium mb-2'>Daily Trading Volume</h4>
                    <p className='text-2xl font-semibold text-blue-600'>₹24.5M</p>
                </div>
                
                <div className='p-6 bg-green-50 rounded-lg'>
                    <h4 className='font-medium mb-2'>Active Traders</h4>
                    <p className='text-2xl font-semibold text-green-600'>250+</p>
                </div>
                
                <div className='p-6 bg-yellow-50 rounded-lg'>
                    <h4 className='font-medium mb-2'>Price Volatility</h4>
                    <p className='text-2xl font-semibold text-yellow-600'>±2.3%</p>
                </div>
            </div>
        </div>
    )
}

export default TrendingGrains

// Data to be given.
// {
//     _id: string,
//     name: string,
//     image: string,
//     pricePerTon: number,
//     qualityGrade: string,
//     origin: string,
//     availableQuantity: number,
//     minOrderQuantity: number,
//     certifications: string[],
//     priceChange: number,
//     trending: boolean
// }