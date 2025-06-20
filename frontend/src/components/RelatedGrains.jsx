import React, { useState, useEffect, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import GrainCard from './GrainCard'
import Title from './Title'

const RelatedGrains = ({ grainType, origin }) => {
    const { products } = useContext(ShopContext)
    const [relatedGrains, setRelatedGrains] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            // Filter grains by type and origin, excluding current product
            const filteredGrains = products
                .filter(grain => 
                    (grain.grainType === grainType || grain.origin === origin) &&
                    grain._id !== products._id
                )
                .sort((a, b) => b.qualityGrade.localeCompare(a.qualityGrade))
                .slice(0, 4)

            setRelatedGrains(filteredGrains)
        }
    }, [products, grainType, origin])

    if (relatedGrains.length === 0) return null

    return (
        <div className='my-16'>
            <div className='text-center mb-8'>
                <Title text1={'SIMILAR'} text2={'GRAINS'} />
                <p className='text-gray-600 mt-2'>
                    Similar quality grains from verified suppliers
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {relatedGrains.map((grain) => (
                    <GrainCard 
                        key={grain._id} 
                        grain={{
                            ...grain,
                            trending: grain.tradingVolume > 1000, // Example condition
                        }}
                    />
                ))}
            </div>

            {/* Quick Market Summary */}
            <div className='mt-8 bg-gray-50 rounded-lg p-6'>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-center'>
                    <div>
                        <p className='text-gray-600 text-sm'>Avg. Price/Ton</p>
                        <p className='font-semibold text-lg'>
                            ₹{Math.round(relatedGrains.reduce((acc, grain) => 
                                acc + grain.pricePerTon, 0) / relatedGrains.length).toLocaleString()}
                        </p>
                    </div>
                    <div>
                        <p className='text-gray-600 text-sm'>Total Available</p>
                        <p className='font-semibold text-lg'>
                            {relatedGrains.reduce((acc, grain) => 
                                acc + grain.availableQuantity, 0).toLocaleString()} tons
                        </p>
                    </div>
                    <div>
                        <p className='text-gray-600 text-sm'>Price Range</p>
                        <p className='font-semibold text-lg'>
                            ₹{Math.min(...relatedGrains.map(g => g.pricePerTon)).toLocaleString()} - 
                            ₹{Math.max(...relatedGrains.map(g => g.pricePerTon)).toLocaleString()}
                        </p>
                    </div>
                    <div>
                        <p className='text-gray-600 text-sm'>Suppliers</p>
                        <p className='font-semibold text-lg'>
                            {new Set(relatedGrains.map(g => g.supplierId)).size}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RelatedGrains