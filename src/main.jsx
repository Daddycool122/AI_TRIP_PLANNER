import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import { RouterProvider } from 'react-router-dom'
import Header from './components/custom/Header.jsx'
import { Toaster } from 'sonner'
import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './view-trip/index.jsx'
import Footer from './components/footer.jsx'
import MyTrips from './my-trips/index.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/create-trip',
    element:<CreateTrip/>
  },
  {
    path:'/view-trip/:tripId',
    element:<ViewTrip/>
  },
  {
    path:'/my-trips/',
    element:<MyTrips/>
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="714493434913-t9d90s22e6afj73h3drtabdkkpqs9euf.apps.googleusercontent.com">
    <Header/>
    <Toaster/>
    <RouterProvider router={router}/>
    <Footer/>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
