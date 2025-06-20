import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from 'axios'

export const ShopContext = createContext()

const GrainContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
    console.log("Backend URL:", backendUrl); // Add this for debugging
    const currency = "₹";
    const deliveryCharge = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [grains, setGrains] = useState([]);
    const [cart, setCart] = useState({
        items: [],
        totalQuantity: 0,
        totalAmount: 0
    })
    const [token, setToken] = useState('')
    const [userInfo, setUserInfo] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        getGrains();
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    // Fetch cart when token is updated
    useEffect(() => {
        if (token) {
            getUserCart(token); // Call getUserCart when token is set
        }
    }, [token]);

    // Add grain to cart with quantity
    const addToCart = async (grainId, quantity, price) => {
        if (!token) {
            toast.error("Please login to place orders")
            navigate('/login')
            return;
        }
        if (quantity <= 0) {
            toast.error("Please enter valid quantity")
            return;
        }
        try {
            const response = await axios.post(
                `${backendUrl}/api/cart/add`,
                { grainId, quantity, price },
                { 
                    headers: { token },
                    withCredentials: true 
                }
            )
            if (response.data.success) {
                setCart(response.data.cartData)
                toast.success("Added to cart successfully")
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || "Error adding to cart")
        }
    }
    // Get cart total quantity
    const getCartCount = () => {
        if (!cart || typeof cart !== "object") return 0;
        return Object.values(cart).reduce((total, item) => total + item.quantity, 0)
    }

    // Update quantity in cart
    const updateQuantity = async (grainId, quantity) => {
        try {
            if (quantity === 0) {
                const response = await axios.delete(`${backendUrl}/api/cart/remove`, {
                    headers: { token },
                    data: { grainId },
                    withCredentials: true,
                });
                if (response.data.success) {
                    // Make sure we're using the correct property name from the response
                    // and properly updating the cart state
                    setCart(prevCart => ({
                        ...prevCart,
                        items: prevCart.items.filter(item => item.grainId !== grainId),
                        totalQuantity: prevCart.totalQuantity - (prevCart.items.find(item => item.grainId === grainId)?.quantity || 0)
                    }));
                }
                return;
            }
            const grain = grains.find(g => g._id === grainId);
            const response = await axios.post(
                `${backendUrl}/api/cart/update`,
                { grainId, quantity, price: grain.price },
                { headers: { token } }
            )
            if (response.data.success) {
                setCart(response.data.cart)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating quantity")
        }
    }

    // Calculate cart total amount
    const getCartAmount = () => {
        if (!cart || !cart.items) return 0;
        let cartAmount = 0;
        cart.items.forEach(item => {
            cartAmount += item.quantity * item.price;
        });
        return cartAmount;
    }

    // Fetch all grains
    const getGrains = async () => {
        try {
            console.log("Getting grains from the backend");
            const response = await axios.get(`${backendUrl}/api/grains`, {withCredentials:true}) 
            console.log(response.data, "Data");
            if (response.data.success) {
                setGrains(response.data.grains);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {            
            console.error('Error fetching grains:', error);
            toast.error("Error fetching grains");
        }
    }
    

    // Get user cart on login
    const getUserCart = async (token) => {
        try {
            const response = await axios.get(  // Changed from post to get
                `${backendUrl}/api/cart/get`,
                { headers: { token } },  // Fixed headers structure
                {withCredentials: true}
            )

            if (response.data.success) {
                setCart(response.data.cartData)
                getCartAmount(response.data.cartData.totalAmount);
            }
        } catch (error) {
            console.error(error)
        }
    }

    // Get user info
    // const getUserInfo = async () => {
    //     try {
    //         const response = await axios.get(
    //             `${backendUrl}/api/user/profile`,
    //             { headers: { token } }
    //         )
    //         if (response.data.success) {
    //             setUserInfo(response.data.user)
    //         }
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    // Initialize data
    // Initialize data

    const contextValue = {
        grains,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        addToCart,
        cart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken,
        userInfo,
        setCart,
        currency,
        deliveryCharge
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default GrainContextProvider
