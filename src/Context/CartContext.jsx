import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Function to build headers dynamically to ensure we always have the latest token
  const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  });

  // 1. Get Logged user cart
  // async function getCartItems() {
  //   setIsLoading(true);
  //   try {
  //     const res = await axios.get("http://smartbracelet.runasp.net/api/basket", {
  //       headers: getHeaders(),
  //     });
  //     setCartItems(res.data?.items || []);
  //   } catch (error) {
  //     if (error.response?.status === 404) {
  //       setCartItems([]);
  //     } else {
  //       setApiError("Error fetching your cart.");
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }
  async function getCartItems() {
  setIsLoading(true);
  try {
    const res = await axios.get("http://smartbracelet.runasp.net/api/basket", {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
    });

    // بص هنا: السيرفر باعت الـ items جوه data جوه data ثانية
    // حسب الـ Console اللي إنت بعته: res.data هو الـ object الكبير
    // جواه داتا (data) جواها items
    console.log("Full API Response:", res.data); 
    
    if (res.data && res.data.data) {
      setCartItems(res.data.data.items || []);
    } else {
      setCartItems([]);
    }

  } catch (error) {
    console.error("Fetch Cart Error:", error);
    setCartItems([]); // لو حصل ايرور بنفضيها عشان الـ UI ميعلقش
  } finally {
    setIsLoading(false);
  }
}

//   2. Add Product To Cart (/api/basket/items)
  async function addToCart(product) {
  try {
    const itemData = {
      id: product.id,
      productName: product.name, // السيرفر عايزها productName
      pictureUrl: product.imageUrl || product.image, // السيرفر عايزها pictureUrl
      price: product.price,
      quantity: 1
    };

    await axios.post(
      "http://smartbracelet.runasp.net/api/basket/items",
      itemData,
      { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
    );
    
    // أهم خطوة: لازم تنادي دي عشان الـ UI يحس بالتغيير
    await getCartItems(); 
    console.log("item added");
  } catch (error) {
    console.error("خطأ في الإضافة:", error.response?.data);
  }
}


  // 3. Update product quantity (PUT)
  async function updateQuantity(id, newQuantity) {
    if (newQuantity < 1) return;
    try {
      await axios.put(
        `http://smartbracelet.runasp.net/api/basket/items/${id}?quantity=${newQuantity}`,
        {},
        { headers: getHeaders() }
      );
      // Optimistic UI update
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
      );
    } catch (error) {
      getCartItems(); // Rollback if API fails
    }
  }

  // 4. Remove specific cart Item (DELETE)
  async function removeCartItem(id) {
    try {
      await axios.delete(`http://smartbracelet.runasp.net/api/basket/items/${id}`, {
        headers: getHeaders(),
      });
      // Remove from UI immediately
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Remove Item Error:", error);
    }
  }

  // 5. Clear ALL user cart (/api/basket/clear)
  async function clearCart() {
    setIsLoading(true);
    try {
      await axios.delete("http://smartbracelet.runasp.net/api/basket/clear", {
        headers: getHeaders(),
      });
      setCartItems([]); // Clear UI
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