import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import smartcarelogo from "../../assets/agaga.jpeg";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { UserContext } from "./../../Context/UserContext";

export default function Navbar() {
  const { userLogin, setuserLogin } = useContext(UserContext);
  const navigate = useNavigate();

  function handleSignOut() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
  }

  return (
    <nav className="bg-[#009DDC] shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        {/* Logo (Left) */}
        <NavLink to="/" className="flex items-center space-x-3">
          <img
            src={smartcarelogo}
            alt="SmartCare Logo"
            className="w-20 h-auto object-contain"
          />
        </NavLink>

        {/* Main Links (Center) — Only if logged in */}
        {userLogin && (
          <div className="flex-1 flex justify-center">
            <ul className="flex space-x-8">
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
                      `text-lg font-medium px-3 py-2 rounded-md transition duration-200 ${
                        isActive
                          ? "bg-white text-[#009DDC]"
                          : "text-white hover:bg-white hover:text-[#009DDC]"
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

        {/* Auth Buttons (Right) */}
        <div className="flex items-center space-x-4">
          {userLogin ? (
            <>
              <NavLink
                to="/profile"
                className="text-lg px-4 py-2 rounded-md font-medium text-white hover:bg-white hover:text-[#009DDC] transition duration-200"
              >
                Profile
              </NavLink>

              <span
                onClick={handleSignOut}
                className="text-lg px-4 py-2  cursor-pointer rounded-md font-medium text-white  hover:bg-white hover:text-[#009DDC] transition duration-200"
              >
                Sign Out
              </span>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-lg px-4 py-2 rounded-md font-medium text-white hover:bg-white hover:text-[#009DDC] transition duration-200"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="text-lg px-4 py-2 rounded-md font-medium text-white hover:bg-white hover:text-[#009DDC] transition duration-200"
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
