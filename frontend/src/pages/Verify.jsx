import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import Title from '../components/Title'

const Verify = () => {
    const { navigate, setCartItem, token, backendUrl } = useContext(ShopContext)
    const [searchParams] = useSearchParams()
    const [verificationStatus, setVerificationStatus] = useState('processing')
    const [orderDetails, setOrderDetails] = useState(null)

    const paymentType = searchParams.get('type')
    const orderId = searchParams.get('orderId')
    const status = searchParams.get('status')

    const verifyPayment = async () => {
        try {
            if (!token) {
                navigate('/login')
                return
            }

            switch(paymentType) {
                case 'bank_transfer':
                    const response = await axios.post(
                        `${backendUrl}/api/payment/verify-bank-transfer`,
                        { orderId, status },
                        { headers: { token } }
                    )
                    
                    if(response.data.success) {
                        setVerificationStatus('success')
                        setOrderDetails(response.data.orderDetails)
                        setCartItem({})
                    } else {
                        setVerificationStatus('failed')
                    }
                    break

                case 'letter_of_credit':
                    const lcResponse = await axios.post(
                        `${backendUrl}/api/payment/verify-lc`,
                        { orderId, status },
                        { headers: { token } }
                    )
                    
                    if(lcResponse.data.success) {
                        setVerificationStatus('success')
                        setOrderDetails(lcResponse.data.orderDetails)
                        setCartItem({})
                    } else {
                        setVerificationStatus('failed')
                    }
                    break

                default:
                    setVerificationStatus('failed')
                    toast.error('Invalid payment type')
                    navigate('/cart')
            }
        } catch (error) {
            console.error(error)
            setVerificationStatus('failed')
            toast.error(error.response?.data?.message || 'Payment verification failed')
        }
    }

    useEffect(() => {
        if (token) {
            verifyPayment()
        }
    }, [token])

    const renderStatus = () => {
        switch(verificationStatus) {
            case 'processing':
                return (
                    <div className='text-center'>
                        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
                        <h2 className='text-xl font-medium mb-2'>Verifying Payment</h2>
                        <p className='text-gray-600'>Please wait while we verify your payment...</p>
                    </div>
                )

            case 'success':
                return (
                    <div className='text-center'>
                        <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <svg className='w-8 h-8 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                            </svg>
                        </div>
                        <h2 className='text-xl font-medium mb-2'>Payment Verification Successful</h2>
                        <p className='text-gray-600 mb-6'>Your order has been confirmed</p>
                        
                        {orderDetails && (
                            <div className='max-w-md mx-auto bg-gray-50 p-4 rounded-lg text-left'>
                                <h3 className='font-medium mb-2'>Order Details</h3>
                                <div className='grid grid-cols-2 gap-2 text-sm'>
                                    <p>Order ID:</p>
                                    <p className='font-medium'>{orderDetails.orderId}</p>
                                    <p>Amount:</p>
                                    <p className='font-medium'>₹{orderDetails.amount.toLocaleString()}</p>
                                    <p>Payment Method:</p>
                                    <p className='font-medium'>{orderDetails.paymentMethod}</p>
                                </div>
                            </div>
                        )}

                        <div className='mt-8 space-x-4'>
                            <button 
                                onClick={() => navigate('/orders')}
                                className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors'
                            >
                                View Orders
                            </button>
                            <button 
                                onClick={() => navigate('/grains')}
                                className='border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50 transition-colors'
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                )

            case 'failed':
                return (
                    <div className='text-center'>
                        <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <svg className='w-8 h-8 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                            </svg>
                        </div>
                        <h2 className='text-xl font-medium mb-2'>Payment Verification Failed</h2>
                        <p className='text-gray-600 mb-6'>There was an issue verifying your payment</p>
                        
                        <div className='space-x-4'>
                            <button 
                                onClick={() => navigate('/cart')}
                                className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors'
                            >
                                Return to Cart
                            </button>
                            <button 
                                onClick={() => navigate('/contact')}
                                className='border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50 transition-colors'
                            >
                                Contact Support
                            </button>
                        </div>
                    </div>
                )
        }
    }

    return (
        <div className='min-h-[60vh] flex items-center justify-center py-12'>
            <div className='w-full max-w-2xl'>
                <Title text1={'PAYMENT'} text2={'VERIFICATION'} />
                <div className='mt-8'>
                    {renderStatus()}
                </div>
            </div>
        </div>
    )
}

export default Verify