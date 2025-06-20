import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiUser, FiLock } from 'react-icons/fi';

const Login = ({ setToken }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            if (!email || !password) {
                toast.error('Please enter both email and password');
                setIsLoading(false);
                return;
            }

            const response = await axios.post(
                `${backendUrl}/api/users/admin-login`,
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            
            if (response.data.success) {
                toast.success('Login successful!');
                setToken(response.data.token);
            } else {
                toast.error(response.data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.response?.data?.message || 'Authentication failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center w-full bg-gray-50'>
            <div className='bg-white shadow-lg rounded-lg px-8 py-8 max-w-md w-full'>
                <div className="text-center mb-6">
                    <h1 className='text-3xl font-bold text-gray-800'>GrainTrade Admin</h1>
                    <p className="text-gray-600 mt-2">Sign in to manage your platform</p>
                </div>
                
                <form onSubmit={onSubmitHandler} className="space-y-5">
                    <div className="space-y-4">
                        <div>
                            <label className='text-sm font-medium text-gray-700 block mb-2'>Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiUser className="text-gray-400" />
                                </div>
                                <input 
                                    type="email" 
                                    placeholder='admin@example.com' 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    value={email} 
                                    className='rounded-lg w-full pl-10 px-3 py-3 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition' 
                                />
                            </div>
                        </div>

                        <div>
                            <label className='text-sm font-medium text-gray-700 block mb-2'>Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="text-gray-400" />
                                </div>
                                <input 
                                    type="password" 
                                    placeholder='••••••••' 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    value={password} 
                                    className='rounded-lg w-full pl-10 px-3 py-3 border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition' 
                                />
                            </div>
                        </div>
                    </div>
                    
                    <button 
                        className={`mt-4 w-full px-4 py-3 rounded-lg text-white bg-amber-600 hover:bg-amber-700 transition-colors font-medium ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`} 
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                Signing in...
                            </div>
                        ) : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;