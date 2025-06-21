import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ContextProvider } from './context/Contextprovider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ContextProvider>
  </StrictMode>,
)
