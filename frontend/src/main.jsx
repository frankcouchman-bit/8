import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { SessionProvider } from './state/session.jsx'
import './index.css'
createRoot(document.getElementById('root')).render(<BrowserRouter><SessionProvider><App/></SessionProvider></BrowserRouter>)