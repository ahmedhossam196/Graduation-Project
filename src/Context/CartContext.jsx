import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  });

  async function getCartItems() {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/basket", {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
      });

      console.log("Full API Response:", res.data); 
      
      if (res.data && res.data.data) {
        setCartItems(res.data.data.items || []);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Fetch Cart Error:", error);
      setCartItems([]); 
    } finally {
      setIsLoading(false);
    }
  }

  async function addToCart(product) {
    try {
      const itemData = {
        id: product.id,
        productName: product.name, 
        pictureUrl: product.imageUrl || product.image, 
        price: product.price,
        quantity: 1
      };

      await axios.post(
        "/api/basket/items",
        itemData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
      );
      
      await getCartItems(); 
      console.log("item added");
    } catch (error) {
      console.error("Add to cart error:", error.response?.data);
    }
  }

  async function updateQuantity(id, newQuantity) {
    if (newQuantity < 1) return;
    try {
      await axios.put(
        `/api/basket/items/${id}?quantity=${newQuantity}`,
        {},
        { headers: getHeaders() }
      );
      
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
      );
    } catch (error) {
      getCartItems(); 
    }
  }

  async function removeCartItem(id) {
    try {
      await axios.delete(`/api/basket/items/${id}`, {
        headers: getHeaders(),
      });
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Remove Item Error:", error);
    }
  }

  async function clearCart() {
    setIsLoading(true);
    try {
      await axios.delete("/api/basket/clear", {
        headers: getHeaders(),
      });
      setCartItems([]);
    } catch (error) {
      console.error("Clear Cart Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getCartItems();
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        getCartItems,
        updateQuantity,
        removeCartItem,
        clearCart,
        isLoading,
        apiError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}