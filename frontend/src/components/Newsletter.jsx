import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Newsletter = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        try {
            // API call would go here
            await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
            toast.success('Successfully subscribed to market updates!')
            setEmail('')
        } catch (error) {
            toast.error('Failed to subscribe. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='bg-blue-50 py-12 px-4'>
            <div className='max-w-3xl mx-auto text-center'>
                <h2 className='text-2xl sm:text-3xl font-semibold text-gray-800 mb-3'>
                    Stay Updated with Market Trends
                </h2>
                
                <p className='text-gray-600 mb-6'>
                    Get daily price updates, market analysis, and trading opportunities 
                    delivered to your inbox
                </p>

                <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-3 max-w-xl mx-auto'>
                    <div className='flex-1'>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter your business email'
                            className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none'
                            required
                        />
                    </div>
                    
                    <button 
                        type='submit'
                        disabled={loading}
                        className={`px-6 py-3 rounded-lg font-medium text-white 
                            ${loading 
                                ? 'bg-blue-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700'
                            } transition-colors`}
                    >
                        {loading ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </form>

                <div className='mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-600'>
                    <div className='flex items-center gap-2'>
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Daily Price Updates</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Market Analysis</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Trading Opportunities</span>
                    </div>
                </div>

                <p className='mt-4 text-xs text-gray-500'>
                    By subscribing, you agree to receive market updates and newsletters. 
                    You can unsubscribe at any time.
                </p>
            </div>
        </div>
    )
}

export default Newsletter