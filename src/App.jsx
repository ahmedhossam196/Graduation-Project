import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
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
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element:<ProtectedRoute>
        <Home/>
      </ProtectedRoute>},
      { path: "login", element: <Login /> },
      { path: "Register", element: <Register /> },
      { path: "Products", element:<ProtectedRoute>
        <Products/>
      </ProtectedRoute>},
      { path: "cart", element:<ProtectedRoute>
        <Cart/>
      </ProtectedRoute>},
      { path: "map", element:<ProtectedRoute>
        <Map/>
      </ProtectedRoute>},
      { path: "profile", element:<ProtectedRoute>
        <Profile/>
      </ProtectedRoute>},
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {

  return (
    <>
    <UserContextProvider>
      <RouterProvider router={x}></RouterProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
