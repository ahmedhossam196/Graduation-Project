import React from 'react'
import style from "./Navbar.module.css"
import { Link } from 'react-router-dom'
import smartcarelogo from "../../assets/Logo11.png"
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Navbar() {
   function UserMenu() {
  const [open, setOpen] = useState(false);
  }
  return (
   <>
   

<nav className="bg-[#009DDC] ">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 position-relative">
       <Link to="/" className="flex items-center space-x-3 ">
          <img
            src={smartcarelogo}
            alt="SmartCare Logo"
            className="w-35 object-contain" // 👈 bigger logo
          />
        </Link>


    <div className="bg-[#009DDC] flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button
  type="button"
  className="flex items-center justify-center w-8 h-8 bg-[#009DDC] rounded-full md:me-0 focus:ring-4 focus:ring-white"
  id="user-menu-button"
  aria-expanded="false"
  data-dropdown-toggle="user-dropdown"
  data-dropdown-placement="bottom"
>
  <span className="sr-only">Open user menu</span>
  <i className="bg-[#009DDC] fa-solid fa-list text-white text-lg"></i>
</button>

      <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">UserName</span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">UserName@gmail.com</span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</Link>
          </li>
          <li>
            <Link to="" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</Link>
          </li>
        
          <li>
            <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
    </li>
        </ul>
      </div>
      
    </div>
    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
      <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#009DDC]">
       <li>
    <Link
      to="/"
      className=" text-xl text-white px-3 py-2 rounded-md hover:text-[#009DDC] hover:bg-white transition duration-200"
    >
      Home
    </Link>
  </li>
  <li>
    <Link
      to="/products"
      className=" text-xl text-white px-3 py-2 rounded-md hover:text-[#009DDC] hover:bg-white transition duration-200"
    >
      Products
    </Link>
  </li>
  <li>
    <Link
      to="/cart"
      className=" text-xl text-white px-3 py-2 rounded-md hover:text-[#009DDC] hover:bg-white transition duration-200"
    >
      Cart
    </Link>
  </li>
  <li>
    <Link
      to="/MAP"
      className=" text-xl text-white px-3 py-2 rounded-md hover:text-[#009DDC] hover:bg-white transition duration-200"
    >
      Map
    </Link>
  </li>
      </ul>
    </div>
  </div>
</nav>


   
   </>
  )
}
