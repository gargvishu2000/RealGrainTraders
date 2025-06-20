import React, { useState, useContext, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import logo from '../assets/logo.png'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const location = useLocation()
    
    const { 
        setShowSearch, 
        getCartCount, 
        setToken, 
        navigate, 
        token, 
        setCart,
        userInfo 
    } = useContext(ShopContext);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    // Close mobile menu when route changes
    useEffect(() => {
        setVisible(false);
        setSearchOpen(false);
        setUserMenuOpen(false);
    }, [location]);

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchOpen || visible || userMenuOpen) {
                // Check if click is outside the menus
                if (!event.target.closest('.mobile-menu') && 
                    !event.target.closest('.search-container') &&
                    !event.target.closest('.user-menu-container')) {
                    setSearchOpen(false);
                    setVisible(false);
                    setUserMenuOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchOpen, visible, userMenuOpen]);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCart({})
        setUserMenuOpen(false)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/grains?search=${encodeURIComponent(searchQuery)}`)
            setSearchOpen(false)
        }
    }

    // Animation variants
    const mobileMenuVariants = {
        closed: { 
            x: "100%",
            opacity: 0,
            transition: { 
                type: "tween",
                duration: 0.3
            }
        },
        open: { 
            x: 0,
            opacity: 1,
            transition: { 
                type: "tween",
                duration: 0.3
            }
        }
    };

    const searchBarVariants = {
        closed: { 
            y: -20,
            opacity: 0,
            transition: { 
                duration: 0.2
            }
        },
        open: { 
            y: 0,
            opacity: 1,
            transition: { 
                duration: 0.2
            }
        }
    };

    const dropdownVariants = {
        hidden: { 
            opacity: 0,
            y: -5,
            transition: {
                duration: 0.2
            }
        },
        visible: { 
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <motion.nav 
            className={`sticky top-0 z-40 bg-white border-b transition-all duration-300 ${
                scrolled ? 'shadow-md' : ''
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className='container mx-auto px-4'>
                <div className='flex items-center justify-between h-16'>
                    {/* Logo */}
                    <Link to='/' className='flex items-center'>
                        <motion.img 
                            src={logo} 
                            className='h-8' 
                            alt="GrainTrade" 
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center gap-6'>
                        <NavLink 
                            to='/grains' 
                            className={({ isActive }) => 
                                `text-sm font-medium relative ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    Browse Grains
                                    {isActive && (
                                        <motion.div 
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                                            layoutId="navIndicator"
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>
                        
                        <NavLink 
                            to='/about' 
                            className={({ isActive }) => 
                                `text-sm font-medium relative ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    About Us
                                    {isActive && (
                                        <motion.div 
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                                            layoutId="navIndicator"
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>
                        <NavLink 
                            to='/contact' 
                            className={({ isActive }) => 
                                `text-sm font-medium relative ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    Contact Us
                                    {isActive && (
                                        <motion.div 
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                                            layoutId="navIndicator"
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>
                    </div>

                    {/* Right Side Icons/Buttons */}
                    <div className='flex items-center gap-4'>
                        {/* Cart */}
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <Link to='/cart' className='relative p-2 text-gray-600 hover:text-blue-600'>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {getCartCount() > 0 && (
                                    <motion.span 
                                        className='absolute top-0 right-0 bg-blue-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center'
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                    >
                                        {getCartCount()}
                                    </motion.span>
                                )}
                            </Link>
                        </motion.div>

                        {/* User Menu */}
                        {token ? (
                            <div className='relative user-menu-container'>
                                <motion.button 
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className='flex items-center gap-2 p-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-full hover:bg-gray-50'
                                    whileHover={{ backgroundColor: "#F3F4F6" }}
                                >
                                    <span className="hidden sm:inline">{userInfo?.companyName || 'My Account'}</span>
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                                        {userInfo?.companyName ? userInfo.companyName.charAt(0).toUpperCase() : 'A'}
                                    </div>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </motion.button>
                                
                                <AnimatePresence>
                                    {userMenuOpen && (
                                        <motion.div 
                                            className='absolute right-0 w-56 py-2 mt-2 bg-white rounded-md shadow-lg border border-gray-100 z-50 origin-top-right'
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden"
                                            variants={dropdownVariants}
                                        >
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="text-sm text-gray-500">Signed in as</p>
                                                <p className="text-sm font-medium text-gray-800 truncate">{userInfo?.email || 'user@example.com'}</p>
                                            </div>
                                            
                                            <Link to='/' className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                </svg>
                                                Dashboard
                                            </Link>
                                            <Link to='/orders' className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                                Orders
                                            </Link>
                                            <Link to='/profile' className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Company Profile
                                            </Link>
                                            <hr className='my-2' />
                                            <button 
                                                onClick={logout}
                                                className='flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50'
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link to='/login'>
                                <motion.button 
                                    className='bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700'
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Login
                                </motion.button>
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <motion.button
                            className='md:hidden p-2 text-gray-600 hover:text-blue-600'
                            onClick={() => setVisible(!visible)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {visible ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {visible && (
                    <motion.div 
                        className="fixed inset-0 bg-white z-50 pt-16 mobile-menu"
                        variants={mobileMenuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        <div className="container mx-auto px-4 py-6 h-full overflow-y-auto">
                            <div className="flex flex-col gap-6">
                                {/* Mobile Navigation Links */}
                                <NavLink 
                                    to='/grains' 
                                    className={({ isActive }) => 
                                        `text-lg font-medium py-3 border-b ${isActive ? 'text-blue-600 border-blue-600' : 'text-gray-700 border-gray-200'}`
                                    }
                                    onClick={() => setVisible(false)}
                                >
                                    Browse Grains
                                </NavLink>
                                <NavLink 
                                    to='/about' 
                                    className={({ isActive }) => 
                                        `text-lg font-medium py-3 border-b ${isActive ? 'text-blue-600 border-blue-600' : 'text-gray-700 border-gray-200'}`
                                    }
                                    onClick={() => setVisible(false)}
                                >
                                    About Us
                                </NavLink>
                                <NavLink 
                                    to='/contact' 
                                    className={({ isActive }) => 
                                        `text-lg font-medium py-3 border-b ${isActive ? 'text-blue-600 border-blue-600' : 'text-gray-700 border-gray-200'}`
                                    }
                                    onClick={() => setVisible(false)}
                                >
                                    Contact Us
                                </NavLink>

                                {/* Mobile User Options */}
                                {token ? (
                                    <>
                                        <div className="mt-4 bg-gray-50 rounded-lg p-4">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                                                    {userInfo?.companyName ? userInfo.companyName.charAt(0).toUpperCase() : 'A'}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{userInfo?.companyName || 'My Account'}</p>
                                                    <p className="text-sm text-gray-500">{userInfo?.email || 'user@example.com'}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-3">
                                                <Link 
                                                    to='/' 
                                                    className='flex items-center text-gray-700'
                                                    onClick={() => setVisible(false)}
                                                >
                                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                    </svg>
                                                    Dashboard
                                                </Link>
                                                <Link 
                                                    to='/orders' 
                                                    className='flex items-center text-gray-700'
                                                    onClick={() => setVisible(false)}
                                                >
                                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                    </svg>
                                                    Orders
                                                </Link>
                                                <Link 
                                                    to='/profile' 
                                                    className='flex items-center text-gray-700'
                                                    onClick={() => setVisible(false)}
                                                >
                                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    Company Profile
                                                </Link>
                                                <button 
                                                    onClick={logout}
                                                    className='flex items-center w-full text-left text-red-600 mt-4'
                                                >
                                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="mt-6 flex flex-col gap-3">
                                        <Link 
                                            to='/login'
                                            className='bg-blue-600 text-white py-3 rounded-lg text-center font-medium'
                                            onClick={() => setVisible(false)}
                                        >
                                            Login
                                        </Link>
                                        <Link 
                                            to='/login'
                                            className='border border-gray-300 text-gray-700 py-3 rounded-lg text-center font-medium'
                                            onClick={() => {
                                                setVisible(false);
                                                // This assumes your Login component can handle a signup parameter
                                                navigate('/login?signup=true');
                                            }}
                                        >
                                            Create Business Account
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

export default Navbar