import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import smartcarelogo from "../../assets/agagaa.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { UserContext } from "./../../Context/UserContext";
import { ThemeContext } from "../../Context/ThemeContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const { userLogin, setuserLogin } = useContext(UserContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const isDarkMode = theme === "dark";

  const itemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  function handleSignOut() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
  }

  return (
    <nav className="bg-[#009DDC] dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        
        <NavLink to="/" className="flex items-center space-x-3">
          <img
            src={smartcarelogo}
            alt="SmartCare Logo"
            className="w-20 h-auto object-contain"
          />
        </NavLink>

        {/* Main Links */}
        {userLogin && (
          <div className="flex-1 flex justify-center">
            <ul className="flex space-x-8">
              {[
                { name: "Home", to: "/" },
                { name: "Products", to: "/products" },
              ].map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `text-lg font-medium px-3 py-2 rounded-md transition duration-200 ${
                        isActive
                          ? "bg-white text-[#009DDC] dark:bg-white dark:text-gray-800"
                          : "text-white hover:bg-white hover:text-[#009DDC] dark:hover:text-gray-800"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center space-x-4">
          
          {/* زرار الدارك مود - وضعناه هنا قبل شرط الـ userLogin ليبقى ظاهراً دائماً */}
          <button
            onClick={toggleTheme}
            className="text-white cursor-pointer text-xl p-2 hover:bg-white/20 rounded-md transition"
          >
            {isDarkMode ? (
              <i className="fa-solid fa-sun text-yellow-400"></i>
            ) : (
              <i className="fa-solid fa-moon"></i>
            )}
          </button>

          {userLogin ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `text-lg px-4 py-2 rounded-md font-medium transition duration-200 ${
                    isActive
                      ? "bg-white text-[#009DDC] dark:bg-white dark:text-gray-800 shadow-lg"
                      : "text-white hover:bg-white hover:text-[#009DDC] dark:hover:text-gray-800"
                  }`
                }
              >
                Profile
              </NavLink>

              <span
                onClick={handleSignOut}
                className="text-lg px-4 py-2 cursor-pointer rounded-md font-medium text-white hover:bg-white hover:text-[#009DDC] dark:hover:text-gray-800 transition duration-200"
              >
                Sign Out
              </span>

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `relative text-lg px-4 py-2 rounded-md font-medium transition duration-200 ${
                    isActive
                      ? "bg-white text-[#009DDC] dark:bg-white dark:text-gray-800 shadow-lg"
                      : "text-white hover:bg-white hover:text-[#009DDC] dark:hover:text-gray-800"
                  }`
                }
              >
                <i className="fa-solid fa-cart-shopping"></i>
                {itemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#009DDC] dark:border-gray-800 animate-bounce shadow-md">
                    {itemsCount}
                  </span>
                )}
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-lg px-4 py-2 rounded-md font-medium text-white hover:bg-white hover:text-[#009DDC] dark:hover:text-gray-800 transition duration-200"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="text-lg px-4 py-2 rounded-md font-medium text-white hover:bg-white hover:text-[#009DDC] dark:hover:text-gray-800 transition duration-200"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}