import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Notfound from './components/Notfound/Notfound';
import Map from './components/Map/Map';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';

const x = createBrowserRouter([

{path : "" , element : <Layout/> ,
   children: [
     {path : "/" , element : <Home/>},
{path : "login" , element : <Login/>},
{path : "Register" , element : <Register/>},
{path : "Products" , element : <Products/>},
{path : "cart" , element : <Cart/>},
{path : "map" , element : <Map/>},
{path : "profile" , element : <Profile/>},
{path : "*" , element : <Notfound/>},

]}





])




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <RouterProvider  router={x}></RouterProvider>
    </>
  )
}

export default App
