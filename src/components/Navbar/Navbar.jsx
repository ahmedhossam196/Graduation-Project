import React, { useContext, useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import smartcarelogo from "../../assets/agagaa.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { UserContext } from "../../Context/UserContext";
import { ThemeContext } from "../../Context/ThemeContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const { userLogin, setuserLogin } = useContext(UserContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { cartItems } = useContext(CartContext);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isDark = theme === "dark";
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const itemsCount = cartItems.reduce((t, i) => t + i.quantity, 0);

  function handleSignOut() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
  }

  const navLink =
    "px-5 py-2.5 rounded-xl text-base font-semibold tracking-wide transition-all duration-300 cursor-pointer";

  const active = "bg-white text-[#009DDC] shadow dark:bg-gray-100";
  const inactive = "text-white/90 hover:bg-white/20 cursor-pointer";

  return (
    <header className="sticky top-0 z-50">
      <nav className="backdrop-blur-md bg-[#009DDC]/90 dark:bg-gray-900/90 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 relative" ref={menuRef}>
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 cursor-pointer">
              <img src={smartcarelogo} className="w-14" alt="logo" />
              <span className="text-white text-lg font-semibold tracking-wide hidden sm:block">
                SmartCare
              </span>
            </NavLink>

            {/* Navigation Links - Desktop and Mobile */}
            {userLogin && (
              <div className="flex items-center gap-2">
                {[
                  { path: "/", label: "Home" },
                  { path: "/products", label: "Products" },
                  { path: "/orders", label: "Orders" },
                ].map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `${navLink} ${isActive ? active : inactive}`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-white hover:bg-white/20 cursor-pointer"
              >
                <i
                  className={`fa-solid text-xl ${
                    isDark ? "fa-sun text-yellow-400" : "fa-moon"
                  }`}
                ></i>
              </button>

              {userLogin ? (
                <>
                  {/* Cart - Always Visible */}
                  <NavLink
                    to="/cart"
                    className="relative p-2 text-white hover:bg-white/20 rounded-xl cursor-pointer"
                  >
                    <i className="fa-solid fa-cart-shopping text-xl"></i>
                    {itemsCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-xs flex items-center justify-center animate-bounce rounded-full">
                        {itemsCount}
                      </span>
                    )}
                  </NavLink>

                  {/* User Menu Button - Top Right */}
                  <div className="relative">
                    <button
                      onClick={() => setOpen(!open)}
                      className="p-2 text-white rounded-xl hover:bg-white/20 cursor-pointer transition-transform"
                      aria-label="User menu"
                    >
                      <i className="fa-solid fa-user-circle text-2xl md:text-3xl"></i>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <NavLink to="/login" className={`${navLink} ${inactive} hidden md:block`}>
                    Login
                  </NavLink>
                  <NavLink to="/register" className={`${navLink} ${inactive} hidden md:block`}>
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* User Dropdown Menu - Top Right */}
          {open && userLogin && (
            <div className="absolute top-full right-5 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-in fade-in slide-in-from-top duration-200">
              {/* Profile */}
              <NavLink 
                to="/profile" 
                className="flex items-center px-4 py-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <i className="fa-solid fa-user mr-3 text-[#009DDC]"></i>
                <span className="font-medium">Profile</span>
              </NavLink>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

              {/* Sign Out */}
              <button
                onClick={() => {
                  handleSignOut();
                  setOpen(false);
                }}
                className="flex items-center w-full px-4 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition cursor-pointer"
              >
                <i className="fa-solid fa-sign-out-alt mr-3"></i>
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
