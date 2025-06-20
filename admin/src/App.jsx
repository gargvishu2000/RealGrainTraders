import { useState, useEffect, useReducer } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Add from './pages/Add';
import List from './pages/List';
import Login from './components/Login';
import Orders from './pages/Orders';
import Dashboard from './pages/Dashboard';

// Admin state reducer
function adminReducer(state, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'LOGOUT':
      return { ...state, token: '' };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

function App() {
  // Initial state
  const initialState = {
    token: localStorage.getItem('token') || '',
    loading: false
  };
  
  // Use reducer for more complex state management
  const [state, dispatch] = useReducer(adminReducer, initialState);
  const { token, loading } = state;

  // Set token handler
  const setToken = (newToken) => {
    dispatch({ type: 'SET_TOKEN', payload: newToken });
  };

  // Logout handler
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer position="top-right" autoClose={3000} />
      {
        token === ''
        ? <Login setToken={setToken} />
        : <>
          <Navbar token={token} setToken={handleLogout} />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base'>
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </div>
              ) : (
                <Routes>
                  <Route path="/" element={<Dashboard token={token} />} />
                  <Route path="/add" element={<Add token={token} />} />
                  <Route path="/list" element={<List token={token} />} />
                  <Route path="/orders" element={<Orders token={token} dispatch={dispatch} />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              )}
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App