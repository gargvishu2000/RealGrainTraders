import React, { useEffect, useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const SearchBar = () => {
    const { setSearch } = useContext(ShopContext)
    const [visible, setVisible] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const location = useLocation()

    // Show search bar only on collection/grains page
    useEffect(() => {
        if (location.pathname.includes('collection') || location.pathname.includes('grains')) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [location])

    const handleSearch = (e) => {
        e.preventDefault()
        setSearch(searchQuery)
    }

    if (!visible) return null

    return (
        <div className='border-y bg-gray-50 py-4'>
            <form 
                onSubmit={handleSearch}
                className='container mx-auto px-4 flex justify-center'
            >
                <div className='flex items-center w-full max-w-xl bg-white border rounded-lg'>
                    <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder='Search by grain type, quality, or origin...'
                        className='flex-1 px-4 py-2 outline-none rounded-l-lg'
                    />
                    <button 
                        type="submit"
                        className='px-6 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700'
                    >
                        <svg 
                            className="w-5 h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                            />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar