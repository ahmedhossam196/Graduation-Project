import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/White_logo.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#009DDC] z-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/" className="flex items-center space-x-3">
          <img src={logo} alt="Linko Logo" className="w-24 object-contain" />
        </NavLink>

        <div
          className="bg-[#009DDC] dark:bg-gray-800 flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative"
          ref={dropdownRef}
        >
          <button
            type="button"
            className="flex cursor-pointer items-center justify-center w-8 h-8 bg-[#009DDC] dark:bg-gray-800 rounded-full focus:ring-4 focus:ring-white"
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">Open user menu</span>
            <i className="fa-solid fa-list text-white text-lg"></i>
          </button>

          {/* Dropdown menu */}
          {open && (
            <div className="absolute right-0 top-full mt-2 w-48 z-50 text-base list-none bg-white dark:bg-gray-700 divide-y divide-gray-100 dark:divide-gray-600 rounded-lg shadow-sm transition-all">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  UserName
                </span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                  UserName@gmail.com
                </span>
              </div>
              <ul className="py-2">
                <li>
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    Settings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    Sign out
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#009DDC] dark:md:bg-gray-800">
            {[
              { name: "Home", to: "/" },
              { name: "Products", to: "/products" },
              { name: "Cart", to: "/cart" },
              { name: "Map", to: "/map" },
            ].map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `text-xl px-3 py-2 rounded-md transition duration-200 ${
                      isActive
                        ? "bg-white text-[#009DDC] dark:bg-gray-700 dark:text-white"
                        : "text-white hover:text-[#009DDC] hover:bg-white dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
