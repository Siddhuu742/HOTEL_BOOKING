import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import{BrowserRouter} from 'react-router-dom'
import {ClerkProvider} from '@clerk/clerk-react';
import{AppProvider} from './context/AppContext';

//Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if(!PUBLISHABLE_KEY) {
  throw new Error('Clerk publishable key is not defined. Please set VITE_CLERK_PUBLISHABLE_KEY in your .env file.')
}

createRoot(document.getElementById('root')).render(
    
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
    <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
    </BrowserRouter>
    </ClerkProvider>,
  )



  

