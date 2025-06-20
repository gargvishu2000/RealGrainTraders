import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
    const { 
        cart,
        getCartAmount
        // getGSTRate 
    } = useContext(ShopContext)
    
    const calculateSubtotal = () => {
        return getCartAmount();
    }

    // const calculateGST = () => {
    //     const subtotal = calculateSubtotal()
    //     return (subtotal * getGSTRate()) / 100
    // }
    
    const calculateHandlingCharges = () => {
        const baseCharge = 10
        let totalQuantity = 0
        
        for(let Quantity of cart.items){
            totalQuantity += Quantity.quantity;
        }
        console.log(totalQuantity + "total Q");
        return totalQuantity * baseCharge;
    }

    const calculateTransportationEstimate = () => {
        const baseRate = 500 // per ton per 100km
        let totalEstimate = 0
        
        let distance=100;
        let totalQuantity=0;
        for(let Q of cart.items){
            totalQuantity+= Q.quantity;
        }
        totalEstimate = (distance / 100) * baseRate * totalQuantity;
        return totalEstimate
    }

    const subtotal = calculateSubtotal()
    // const gst = calculateGST()
    const handlingCharges = calculateHandlingCharges()
    const transportationEstimate = calculateTransportationEstimate()
    
    const total = subtotal + handlingCharges + transportationEstimate;

    return (
        <div className='w-full bg-white rounded-lg border p-6'>
            <div className='mb-6'>
                <Title text1={'ORDER'} text2={'SUMMARY'} />
            </div>

            <div className='space-y-4 text-sm'>
                {/* Subtotal */}
                <div className='flex justify-between'>
                    <p className='text-gray-600'>Subtotal</p>
                    <p>₹{subtotal.toLocaleString()}</p>
                </div>

                {/* GST */}
                <div className='flex justify-between'>
                    <div>
                        {/* <p className='text-gray-600'>GST ({getGSTRate()}%)</p> */}
                        <p className='text-xs text-gray-500'>As per government regulations</p>
                    </div>
                    {/* <p>₹{gst.toLocaleString()}</p> */}
                </div>

                {/* Handling Charges */}
                <div className='flex justify-between'>
                    <div>
                        <p className='text-gray-600'>Handling Charges</p>
                        <p className='text-xs text-gray-500'>Including loading & quality check</p>
                    </div>
                    <p>₹{handlingCharges.toLocaleString()}</p>
                </div>

                {/* Transportation Estimate */}
                <div className='flex justify-between'>
                    <div>
                        <p className='text-gray-600'>Transportation Estimate</p>
                        <p className='text-xs text-gray-500'>Final cost may vary based on location</p>
                    </div>
                    <p>₹{transportationEstimate.toLocaleString()}</p>
                </div>

                <div className='border-t border-dashed pt-4 mt-4'>
                    <div className='flex justify-between font-medium text-base'>
                        <p>Total Estimate</p>
                        <p>₹{total.toLocaleString()}</p>
                    </div>
                    <p className='text-xs text-gray-500 mt-2'>
                        * Final amount may vary based on actual weight, distance, and market conditions
                    </p>
                </div>

                {subtotal > 0 && (
                    <div className='bg-blue-50 p-4 rounded-lg mt-6'>
                        <h4 className='font-medium mb-2'>Bulk Order Benefits</h4>
                        <ul className='text-sm text-gray-600 space-y-1'>
                            <li className='flex items-center gap-2'>
                                <span className='text-green-500'>✓</span>
                                Volume-based pricing
                            </li>
                            <li className='flex items-center gap-2'>
                                <span className='text-green-500'>✓</span>
                                Priority shipping
                            </li>
                            <li className='flex items-center gap-2'>
                                <span className='text-green-500'>✓</span>
                                Quality assurance guarantee
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartTotal