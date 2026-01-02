import React, { useContext, useState } from "react";
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
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 cursor-pointer">
              <img src={smartcarelogo} className="w-14" alt="logo" />
              <span className="text-white text-lg font-semibold tracking-wide hidden sm:block">
                SmartCare
              </span>
            </NavLink>

            {/* Desktop Links */}
            {userLogin && (
              <div className="hidden md:flex items-center gap-2">
                {["/", "/products"].map((path, i) => (
                  <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                      `${navLink} ${isActive ? active : inactive}`
                    }
                  >
                    {i === 0 ? "Home" : "Products"}
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
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `${navLink} ${isActive ? active : inactive}`
                    }
                  >
                    Profile
                  </NavLink>

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

                  <button
                    onClick={handleSignOut}
                    className="px-5 py-2.5 rounded-xl text-base font-semibold text-white hover:bg-red-500/80 transition cursor-pointer"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className={`${navLink} ${inactive}`}>
                    Login
                  </NavLink>
                  <NavLink to="/register" className={`${navLink} ${inactive}`}>
                    Register
                  </NavLink>
                </>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden p-2 text-white rounded-xl hover:bg-white/20 cursor-pointer"
              >
                <i className="fa-solid fa-bars text-xl"></i>
              </button>
            </div>
          </div>

          {/* Mobile Dropdown */}
          {open && (
            <div className="md:hidden pb-4 space-y-2">
              {userLogin && (
                <>
                  <NavLink to="/" className={navLink + " " + inactive}>
                    Home
                  </NavLink>
                  <NavLink to="/products" className={navLink + " " + inactive}>
                    Products
                  </NavLink>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
