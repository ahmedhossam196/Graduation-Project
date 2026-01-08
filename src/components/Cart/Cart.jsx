import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import cartIcon from "../../assets/cart-empty.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";

export default function Cart() {
  const { cartItems, getCartItems, removeCartItem, updateQuantity, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [loadingMethods, setLoadingMethods] = useState(false);

  useEffect(() => {
    getCartItems();
    fetchDeliveryMethods();
  }, []);

  // Function to get shipping price based on delivery time
  const getShippingPrice = (deliveryTime) => {
    if (!deliveryTime) return 0;
    const timeStr = deliveryTime.toLowerCase();
    
    // Check for different time patterns
    if (timeStr.includes("1-2 days") || timeStr.includes("1 to 2 days")) {
      return 75;
    } else if (timeStr.includes("2-5 days") || timeStr.includes("2 to 5 days")) {
      return 50;
    } else if (timeStr.includes("5-10 days") || timeStr.includes("5 to 10 days")) {
      return 30;
    } else if (timeStr.includes("week") || timeStr.includes("weeks") || timeStr.includes("1-2 weeks")) {
      return 0; // FREE for longest duration
    }
    return 0; // Default to FREE
  };

  // Function to update delivery method prices based on delivery time
  const updateDeliveryMethodPrices = (methods) => {
    return methods.map(method => {
      // Always calculate price based on delivery time to ensure correct pricing
      // This overrides API prices to match our requirements
      let calculatedPrice = getShippingPrice(method.deliveryTime);
      
      // If calculation failed, try to determine by method ID or name
      if (calculatedPrice === 0 && method.deliveryTime) {
        const methodId = String(method.id || "").toLowerCase();
        const methodName = String(method.shortName || method.name || "").toLowerCase();
        const deliveryTime = String(method.deliveryTime || "").toLowerCase();
        
        // Check by delivery time patterns more carefully
        if (deliveryTime.includes("1-2 days") || deliveryTime.includes("1 to 2 days") || 
            methodId === "1" || methodName.includes("ups1") || methodName.includes("fastest")) {
          calculatedPrice = 75;
        } else if (deliveryTime.includes("2-5 days") || deliveryTime.includes("2 to 5 days") ||
                   methodId === "2" || methodName.includes("ups2") || methodName.includes("express")) {
          calculatedPrice = 50;
        } else if (deliveryTime.includes("5-10 days") || deliveryTime.includes("5 to 10 days") ||
                   methodId === "3" || methodName.includes("ups3") || methodName.includes("standard")) {
          calculatedPrice = 30;
        } else if (deliveryTime.includes("week") || deliveryTime.includes("weeks") ||
                   methodId === "4" || methodName.includes("free")) {
          calculatedPrice = 0;
        }
      }
      
      console.log("Method pricing:", {
        id: method.id,
        name: method.shortName || method.name,
        deliveryTime: method.deliveryTime,
        originalPrice: method.price,
        calculatedPrice: calculatedPrice
      });
      
      return {
        ...method,
        price: calculatedPrice
      };
    });
  };

  const fetchDeliveryMethods = async () => {
    try {
      setLoadingMethods(true);
      const token = localStorage.getItem("userToken");
      const res = await axios.get("http://smartbracelet.runasp.net/api/order/DeliveryMethods", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const methodsData = res.data?.data || res.data || [];
      const methodsArray = Array.isArray(methodsData) ? methodsData : [];
      // Update prices based on delivery time if not set
      const methodsWithPrices = updateDeliveryMethodPrices(methodsArray);
      // Sort by price (cheapest/longest first)
      methodsWithPrices.sort((a, b) => a.price - b.price);
      setDeliveryMethods(methodsWithPrices);
    } catch (err) {
      console.error("Error fetching delivery methods:", err);
      // Fallback to default methods if API fails
      const fallbackMethods = [
        { id: 4, shortName: "FREE", deliveryTime: "1-2 Weeks", price: 0, description: "Free! You get what you pay for" },
        { id: 3, shortName: "Standard", deliveryTime: "5-10 Days", price: 30, description: "Slower but cheap" },
        { id: 2, shortName: "Express", deliveryTime: "2-5 Days", price: 50, description: "Get it within 5 days" },
        { id: 1, shortName: "Fastest", deliveryTime: "1-2 Days", price: 75, description: "Fastest delivery time" },
      ];
      setDeliveryMethods(fallbackMethods);
    } finally {
      setLoadingMethods(false);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const form = useForm({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      userAddress: "",
      deliveryMethodId: 1,
      paymentMethod: 1,
    },
  });

  // Watch delivery method to update shipping price
  const selectedDeliveryMethodId = form.watch("deliveryMethodId");
  
  // Get selected delivery method and shipping price
  // Handle both API methods and fallback methods
  const selectedDeliveryMethod = deliveryMethods.find(m => {
    // Try to match by ID (handle both number and string IDs)
    return m.id === Number(selectedDeliveryMethodId) || 
           m.id === selectedDeliveryMethodId ||
           String(m.id) === String(selectedDeliveryMethodId);
  });
  
  // If no method found in API methods, use fallback pricing based on ID
  let shippingPrice = 0;
  if (selectedDeliveryMethod) {
    shippingPrice = selectedDeliveryMethod.price || 0;
  } else if (deliveryMethods.length === 0) {
    // Fallback pricing when API methods are not loaded
    const methodId = Number(selectedDeliveryMethodId);
    if (methodId === 1) shippingPrice = 75;
    else if (methodId === 2) shippingPrice = 50;
    else if (methodId === 3) shippingPrice = 30;
    else if (methodId === 4) shippingPrice = 0;
  }
  
  const finalTotal = total + shippingPrice;
  
  // Debug logging
  useEffect(() => {
    if (selectedDeliveryMethodId) {
      console.log("Selected Delivery Method ID:", selectedDeliveryMethodId, typeof selectedDeliveryMethodId);
      console.log("Available methods:", deliveryMethods);
      console.log("Found method:", selectedDeliveryMethod);
      console.log("Calculated shipping price:", shippingPrice);
    }
  }, [selectedDeliveryMethodId, deliveryMethods]);

  // Update default delivery method when methods are loaded
  useEffect(() => {
    if (deliveryMethods.length > 0) {
      const currentValue = form.getValues("deliveryMethodId");
      // Only set if current value is not a valid method ID
      const isValidMethod = deliveryMethods.some(m => m.id === currentValue);
      if (!isValidMethod) {
        form.setValue("deliveryMethodId", deliveryMethods[0].id);
      }
    }
  }, [deliveryMethods]);

  const { register, handleSubmit, formState: { errors } } = form;

  const handleOrder = async (data) => {
    const orderData = {
      deliveryMethodId: Number(data.deliveryMethodId),
      address: {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        userAddress: data.userAddress,
        paymentMethod: Number(data.paymentMethod),
      },
    };

    try {
      setLoading(true);
      console.log("Submitting order with data:", orderData);
      const res = await axios.post(
        "http://smartbracelet.runasp.net/api/order",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      
      console.log("Order Response:", res.data);
      console.log("Order created successfully:", res.data?.data || res.data);
      
      // Check if order was created successfully
      if (res.status === 200 || res.status === 201) {
        setShowCheckout(false);
        clearCart();
        toast.success("Order placed successfully! Redirecting to orders...");
        
        // Trigger custom event to refresh orders page if it's open
        window.dispatchEvent(new Event("orderPlaced"));
        
        // Navigate to orders page after a delay to ensure API has processed
        setTimeout(() => {
          navigate("/orders");
          // Trigger another refresh after navigation
          setTimeout(() => {
            window.dispatchEvent(new Event("orderPlaced"));
          }, 500);
        }, 2000);
      } else {
        throw new Error("Order creation failed");
      }
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
      console.error("Error details:", err);
      if(err.response?.status === 401){
        toast.error("Please login to place an order.");
        navigate("/login");
      } else {
        const errorMessage = err.response?.data?.message || 
                           err.response?.data?.error || 
                           err.message || 
                           "Something went wrong while placing the order.";
        toast.error(errorMessage);
        console.error("Full error response:", err.response);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6 relative">
      <Toaster position="top-right" />
      <h1 className="text-[#009DDC] text-4xl md:text-5xl font-extrabold mb-10 text-center tracking-wide animate-pulse">
        Your Cart <i className="fa-solid fa-cart-shopping"></i>
      </h1>

      <div className="max-w-6xl mx-auto">
        {cartItems.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center shadow-2xl transition-transform hover:scale-105 duration-300">
            <img
              src={cartIcon}
              alt="Empty Cart"
              className="w-40 mx-auto mb-6 animate-bounce"
            />
            <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Add some products to start shopping
            </p>
            <Link
              to="/products"
              className="bg-[#009DDC] hover:bg-[#007AA8] text-white px-8 py-3 rounded-2xl font-bold inline-block shadow-lg transition-transform active:scale-95"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="md:col-span-2 flex flex-col gap-5">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-center shadow-xl gap-5 transition-transform hover:scale-102 duration-300"
                >
                  <div className="flex items-center gap-5 w-full sm:w-auto">
                    <img
                      src={
                        item.pictureUrl?.startsWith("http")
                          ? item.pictureUrl
                          : `https://${item.pictureUrl}`
                      }
                      alt={item.productName}
                      className="w-24 h-24 object-cover rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/120?text=No+Image";
                      }}
                    />
                    <div className="flex flex-col justify-between">
                      <h3 className="font-bold text-gray-800 dark:text-gray-100 line-clamp-1 text-lg md:text-xl">
                        {item.productName}
                      </h3>
                      <p className="text-[#009DDC] font-semibold text-lg">
                        {item.price} LE
                      </p>

                      <div className="flex items-center gap-3 mt-3 bg-gray-100 dark:bg-gray-700 rounded-xl w-fit px-3 py-1 shadow-inner">
                        <button
                          onClick={() =>
                            item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity === 1}
                          className="text-[#009DDC] hover:text-[#007AA8] cursor-pointer transition-transform active:scale-125 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <i className="fa-solid fa-minus text-sm md:text-base"></i>
                        </button>
                        <span className="font-bold text-gray-800 dark:text-gray-100 min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="text-[#009DDC] hover:text-[#007AA8] cursor-pointer transition-transform active:scale-125"
                        >
                          <i className="fa-solid fa-plus text-sm md:text-base"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-0 pt-4 sm:pt-0">
                    <span className="font-bold text-xl md:text-2xl text-gray-800 dark:text-gray-100">
                      {(item.price * item.quantity).toFixed(2)} LE
                    </span>
                    <button
                      onClick={() => removeCartItem(item.id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer p-2 transition-transform active:scale-125"
                      title="Remove Item"
                    >
                      <i className="fa-solid fa-trash-can text-xl md:text-2xl"></i>
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Order Summary */}
            <aside className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl h-fit sticky top-28 transition-transform hover:scale-102 duration-300">
              <h4 className="text-2xl font-bold mb-5 text-gray-800 dark:text-gray-100">
                Order Summary
              </h4>
              <div className="space-y-3 border-b pb-5 mb-5 text-sm md:text-base">
                <p className="flex justify-between text-gray-600 dark:text-gray-400">
                  Total Items <span>{cartItems.length}</span>
                </p>
                <p className="flex justify-between text-gray-600 dark:text-gray-400">
                  Subtotal <span>{total.toFixed(2)} LE</span>
                </p>
                <p className="flex justify-between text-gray-600 dark:text-gray-400">
                  Shipping <span className={shippingPrice === 0 ? "text-green-600 dark:text-green-400 font-semibold" : ""}>
                    {shippingPrice === 0 ? "FREE" : `${shippingPrice.toFixed(2)} LE`}
                  </span>
                </p>
              </div>
              <p className="flex justify-between font-bold text-2xl md:text-3xl text-gray-800 dark:text-gray-100 mb-6">
                Total <span className="text-[#009DDC]">{finalTotal.toFixed(2)} LE</span>
              </p>

              <button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-[#009DDC] hover:bg-[#007AA8] cursor-pointer text-white py-4 rounded-2xl font-bold mb-3 shadow-xl transition-transform active:scale-95"
              >
                Checkout Now
              </button>
              <button
                onClick={() => {
                  if(window.confirm("Are you sure you want to clear the cart?")) clearCart();
                }}
                className="w-full cursor-pointer border border-red-300 text-red-600 hover:bg-red-50 py-3 rounded-xl transition text-sm md:text-base font-medium"
              >
                Clear Cart
              </button>
            </aside>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in overflow-y-auto"
          onClick={() => setShowCheckout(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 p-5 md:p-6 rounded-2xl w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-300 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
                Shipping Info
              </h2>
              <button
                onClick={() => setShowCheckout(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-lg md:text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit(handleOrder)} className="space-y-3">
              {["fullName", "phoneNumber", "userAddress"].map((field, idx) => (
                <div key={idx}>
                  <label className="block text-xs md:text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 capitalize">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    {...register(field, { 
                      required: true, 
                      ...(field === "phoneNumber" && { pattern: /^[0-9]{11}$/ }) 
                    })}
                    placeholder={
                      field === "fullName"
                        ? "John Doe"
                        : field === "phoneNumber"
                        ? "0123456789"
                        : "Street, City, Building"
                    }
                    className="w-full border dark:border-gray-600 dark:bg-gray-700 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-[#009DDC] outline-none transition-shadow"
                  />
                  {errors[field] && (
                    <span className="text-red-500 text-xs mt-0.5 block">
                      {field === "phoneNumber" ? "Enter a valid 11-digit phone number" : "This field is required"}
                    </span>
                  )}
                </div>
              ))}

              {/* Delivery Method */}
              <div>
                <label className="block text-xs md:text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Delivery Method
                </label>
                {loadingMethods ? (
                  <div className="w-full border dark:border-gray-600 dark:bg-gray-700 p-2.5 rounded-xl flex items-center justify-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Loading...</span>
                  </div>
                ) : deliveryMethods.length > 0 ? (
                  <select
                    {...register("deliveryMethodId", { required: true })}
                    className="w-full border dark:border-gray-600 dark:bg-gray-700 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-[#009DDC] outline-none transition-shadow"
                  >
                    {deliveryMethods.map((method) => (
                      <option key={method.id} value={method.id}>
                        {method.shortName || method.name} ({method.deliveryTime || "N/A"}) - {method.price === 0 ? "FREE" : `${method.price} LE`}
                        {method.description && ` - ${method.description}`}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    {...register("deliveryMethodId", { required: true })}
                    className="w-full border dark:border-gray-600 dark:bg-gray-700 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-[#009DDC] outline-none transition-shadow"
                  >
                    <option value={4}>(2 Weeks)- Free!</option>
                    <option value={3}>(5-10 Days) - 30 LE</option>
                    <option value={2}>(2-5 Days) - 50 LE</option>
                    <option value={1}>(1-2 Days) - 75 LE</option>
                  </select>
                )}
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs md:text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Payment Method
                </label>
                <select
                  {...register("paymentMethod", { required: true })}
                  className="w-full border dark:border-gray-600 dark:bg-gray-700 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-[#009DDC] outline-none transition-shadow"
                >
                  <option value={1}>Cash on Delivery</option>
                  <option value={2}>Visa / Credit Card</option>
                </select>
              </div>

              {/* Order Total Preview */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl border border-gray-200 dark:border-gray-600 mt-3">
                <div className="space-y-1.5 text-xs md:text-sm">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal:</span>
                    <span>{total.toFixed(2)} LE</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Shipping:</span>
                    <span className={shippingPrice === 0 ? "text-green-600 dark:text-green-400 font-semibold" : ""}>
                      {shippingPrice === 0 ? "FREE" : `${shippingPrice.toFixed(2)} LE`}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-1.5 mt-1.5">
                    <div className="flex justify-between font-bold text-base md:text-lg text-gray-800 dark:text-gray-200">
                      <span>Total:</span>
                      <span className="text-[#009DDC]">{finalTotal.toFixed(2)} LE</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#009DDC] hover:bg-[#007AA8] cursor-pointer text-white py-3 rounded-xl font-bold mt-3 shadow-lg transition-transform active:scale-95 text-sm md:text-base ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Processing..." : `Confirm & Pay ${finalTotal.toFixed(2)} LE`}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
