import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import AppRoutes from './Routes/Routes';
import './index.css'
import AuthProvider from './provider/AuthProvider';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
    <Toaster position="top-center" reverseOrder={false} />
  </StrictMode>,
)
