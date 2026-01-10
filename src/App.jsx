import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Notfound from "./components/Notfound/Notfound";
import Map from "./components/Map/Map";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Orders from "./components/Orders/Orders"; // ✅ Added Orders import
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import ThemeContextProvider from "./Context/ThemeContext";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "Register", element: <Register /> },
      {
        path: "Products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "map",
        element: (
          <ProtectedRoute>
            <Map />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders", // ✅ Orders route
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <Toaster />
      <UserContextProvider>
        <ThemeContextProvider>
          <CartContextProvider>
            <RouterProvider router={router} />
          </CartContextProvider>
        </ThemeContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
