import React, { useContext, useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import GrainCard from '../components/GrainCard'
import { FiFilter, FiGrid, FiList, FiChevronRight } from 'react-icons/fi'
import { motion } from 'framer-motion'

const CategoryProduct = () => {
    const [searchParams] = useSearchParams()
    const type = searchParams.get('type')
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [viewMode, setViewMode] = useState('grid')
    const [showFilters, setShowFilters] = useState(false)
    const { token, backendUrl } = useContext(ShopContext)

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${backendUrl}/api/grains/`,
                    { headers: { token } })
                    
                const data = response.data.grains.filter((g) => g.type === type)
                setProducts(data)
            } catch (error) {
                console.log("Error fetching products: ", error)
                setProducts([])
            } finally {
                setLoading(false)
            }
        }
        if (type) {
            fetchProducts()
        }
    }, [type, token, backendUrl])

    // Get category image based on type
    const getCategoryImage = () => {
        switch(type) {
            case 'Rice':
                return 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
            case 'Wheat':
                return 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
            case 'Dal':
                return 'https://images.unsplash.com/photo-1612257999756-9d59243c18f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
            case 'Oil':
                return 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
            case 'Sugar':
                return 'https://images.unsplash.com/photo-1581000197348-5a65510f1497?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
            case 'Atta':
                return 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
            default:
                return 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500 mb-6">
                <Link to="/" className="hover:text-amber-600">Home</Link>
                <FiChevronRight className="mx-2 mt-1" />
                <Link to="/grains" className="hover:text-amber-600">Grains</Link>
                <FiChevronRight className="mx-2 mt-1" />
                <span className="text-gray-900">{type || "All Categories"}</span>
            </nav>

            {/* Category Header */}
            <div className="relative rounded-xl overflow-hidden mb-8 shadow-md">
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
                <img 
                    src={getCategoryImage()} 
                    alt={type} 
                    className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-center px-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        {type || "All Products"}
                    </h1>
                    <p className="text-white/80 max-w-xl">
                        Browse our selection of premium quality {type?.toLowerCase() || "grain"} products 
                        sourced directly from verified suppliers.
                    </p>
                </div>
            </div>

            {/* Filters and View Controls */}
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <div className="flex items-center">
                    <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border shadow-sm hover:bg-gray-50"
                    >
                        <FiFilter className="text-amber-600" />
                        <span>Filters</span>
                    </button>
                    <div className="ml-4 text-gray-500">
                        <span>{products.length} products found</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-gray-500 mr-2">View:</span>
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-amber-100 text-amber-600' : 'text-gray-500'}`}
                    >
                        <FiGrid />
                    </button>
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-amber-100 text-amber-600' : 'text-gray-500'}`}
                    >
                        <FiList />
                    </button>
                </div>
            </div>

            {/* Filter Panel - Conditionally shown */}
            {showFilters && (
                <div className="bg-white p-6 rounded-xl shadow-md mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="font-medium mb-3">Price Range</h3>
                        <div className="flex items-center gap-2">
                            <input type="range" className="w-full accent-amber-600" />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium mb-3">Grade</h3>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="accent-amber-600" />
                                <span>Premium</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="accent-amber-600" />
                                <span>Standard</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="accent-amber-600" />
                                <span>Economy</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium mb-3">Origin</h3>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="accent-amber-600" />
                                <span>North India</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="accent-amber-600" />
                                <span>South India</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="accent-amber-600" />
                                <span>Imported</span>
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
                </div>
            ) : (
                <>
                    {/* Products Grid/List */}
                    {products.length > 0 ? (
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className={viewMode === 'grid' 
                                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" 
                                : "flex flex-col gap-4"
                            }
                        >
                            {products.map((item, index) => (
                                <motion.div key={index} variants={itemVariants}>
                                    {viewMode === 'grid' ? (
                                        <GrainCard grain={item} />
                                    ) : (
                                        <div className="flex bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                            <div className="w-1/3">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="w-2/3 p-4">
                                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                                <div className="flex gap-2 my-2">
                                                    <span className="bg-amber-50 text-amber-700 px-2 py-1 rounded-full text-xs">
                                                        {item.type}
                                                    </span>
                                                    {item.grade && (
                                                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                                                            Grade: {item.grade}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-gray-500 text-sm mb-3">
                                                    {item.description?.substring(0, 100)}...
                                                </p>
                                                <div className="flex justify-between items-center">
                                                    <span className="font-bold text-amber-600">₹{item.price}</span>
                                                    <Link 
                                                        to={`/grains/${item._id}`}
                                                        className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-700"
                                                    >
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="bg-white rounded-xl p-10 text-center shadow-sm">
                            <div className="text-amber-600 text-5xl mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">No products found</h3>
                            <p className="text-gray-500 mb-6">
                                We couldn't find any {type?.toLowerCase()} products at the moment.
                            </p>
                            <Link 
                                to="/grains" 
                                className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                            >
                                Browse All Grains
                            </Link>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default CategoryProduct