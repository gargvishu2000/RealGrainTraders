import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import GrainContextProvider from './context/ShopContext' // Ensure correct path
import { BrowserRouter } from 'react-router-dom'
import { Buffer } from 'buffer';

window.Buffer = Buffer; // Ensures Buffer is globally available


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <GrainContextProvider>
            <App />
        </GrainContextProvider>
    </BrowserRouter>
)
