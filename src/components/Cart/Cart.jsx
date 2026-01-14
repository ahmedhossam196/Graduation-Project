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

  // 1. Updated Keywords to UPS naming and fixed logic
  const getShippingPrice = (method) => {
    const timeStr = String(method.deliveryTime || "").toLowerCase();
    const id = Number(method.id);

    if (timeStr.includes("1-2 days") || id === 1) return 75; // UPS1
    if (timeStr.includes("2-5 days") || id === 2) return 50; // UPS2
    if (timeStr.includes("5-10 days") || id === 3) return 30; // UPS3
    if (timeStr.includes("week") || id === 4) return 0;      // UPS4
    
    return 30; // Default fallback price
  };

  const updateDeliveryMethodPrices = (methods) => {
    return methods.map(method => ({
      ...method,
      price: getShippingPrice(method)
    }));
  };

  const fetchDeliveryMethods = async () => {
    try {
      setLoadingMethods(true);
      const token = localStorage.getItem("userToken");
      const res = await axios.get("http://smartbracelet.runasp.net/api/order/DeliveryMethods", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const methodsData = res.data?.data || res.data || [];
      const methodsWithPrices = updateDeliveryMethodPrices(Array.isArray(methodsData) ? methodsData : []);
      methodsWithPrices.sort((a, b) => b.price - a.price);
      setDeliveryMethods(methodsWithPrices);
    } catch (err) {
      // Fallback with new UPS names
      const fallbackMethods = [
        { id: 1, shortName: "UPS1", deliveryTime: "1-2 Days", price: 75 },
        { id: 2, shortName: "UPS2", deliveryTime: "2-5 Days", price: 50 },
        { id: 3, shortName: "UPS3", deliveryTime: "5-10 Days", price: 30 },
        { id: 4, shortName: "UPS4", deliveryTime: "1-2 Weeks", price: 0 },
      ];
      setDeliveryMethods(fallbackMethods);
    } finally {
      setLoadingMethods(false);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);

  const form = useForm({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      userAddress: "",
      deliveryMethodId: 1,
      paymentMethod: 1,
    },
  });

  const selectedDeliveryMethodId = form.watch("deliveryMethodId");
  const selectedDeliveryMethod = deliveryMethods.find(m => String(m.id) === String(selectedDeliveryMethodId));
  const shippingPrice = selectedDeliveryMethod ? selectedDeliveryMethod.price : 0;
  const finalTotal = total + shippingPrice;

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
      const res = await axios.post("http://smartbracelet.runasp.net/api/order", orderData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
      });
      if (res.status === 200 || res.status === 201) {
        setShowCheckout(false);
        clearCart();
        toast.success("Order placed successfully!");
        setTimeout(() => navigate("/orders"), 2000);
      }
    } catch (err) {
      toast.error("Order failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6">
      <Toaster position="top-right" />
      <h1 className="text-[#009DDC] text-4xl md:text-5xl font-extrabold mb-10 text-center">
        Your Cart <i className="fa-solid fa-cart-shopping"></i>
      </h1>

      <div className="max-w-6xl mx-auto">
        {cartItems.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center shadow-2xl">
            <img src={cartIcon} alt="Empty" className="w-40 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold mb-3">Empty Cart</h2>
            <Link to="/products" className="bg-[#009DDC] text-white px-8 py-3 rounded-2xl font-bold inline-block">Browse</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 flex flex-col gap-5">
              {cartItems.map((item) => (
                <article key={item.id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 flex justify-between items-center shadow-xl">
                  <div className="flex items-center gap-5">
                    <img src={item.pictureUrl?.startsWith("http") ? item.pictureUrl : `https://${item.pictureUrl}`} alt={item.productName} className="w-24 h-24 object-cover rounded-xl" />
                    <div>
                      <h3 className="font-bold text-lg">{item.productName}</h3>
                      <p className="text-[#009DDC] font-semibold">{item.price} LE</p>
                      <div className="flex items-center gap-3 mt-3 bg-gray-100 dark:bg-gray-700 rounded-xl px-3 py-1 w-fit">
                        <button onClick={() => item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)} className="text-[#009DDC] hover:text-blue-600"><i className="fa-solid fa-minus cursor-pointer"></i></button>
                        <span className="font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-[#009DDC] hover:text-blue-600"><i className="fa-solid fa-plus cursor-pointer"></i></button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-bold text-xl">{(item.price * item.quantity).toFixed(2)} LE</span>
                    <button onClick={() => removeCartItem(item.id)} className="text-red-500 hover:text-red-800"><i className="fa-solid fa-trash-can cursor-pointer"></i></button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl h-fit sticky top-28">
              <h4 className="text-2xl font-bold mb-5">Summary</h4>
              <div className="space-y-3 border-b pb-5 mb-5">
                <p className="flex justify-between">Subtotal <span>{total.toFixed(2)} LE</span></p>
                <p className="flex justify-between">Shipping <span>{shippingPrice === 0 ? "FREE" : `${shippingPrice} LE`}</span></p>
              </div>
              <p className="flex justify-between font-bold text-2xl mb-6">Total <span className="text-[#009DDC]">{finalTotal.toFixed(2)} LE</span></p>
              
              <button onClick={() => setShowCheckout(true)} className="w-full bg-[#009DDC] hover:bg-blue-500 text-white py-4 rounded-2xl font-bold mb-3 cursor-pointer">Checkout Now</button>
              
              {/* RESTORED CLEAR CART BUTTON */}
              <button 
                onClick={() => { if(window.confirm("Clear all items?")) clearCart(); }}
                className="w-full border border-red-300 text-red-600 hover:bg-red-50 py-3 rounded-xl transition font-medium cursor-pointer"
              >
                Clear Cart
              </button>
            </aside>
          </div>
        )}
      </div>

      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4" onClick={() => setShowCheckout(false)}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">Shipping Info</h2>
            <form onSubmit={handleSubmit(handleOrder)} className="space-y-4">
              <input {...register("fullName", { required: true })} placeholder="Full Name" className="w-full border p-2.5 rounded-xl dark:bg-gray-700" />
              <input {...register("phoneNumber", { required: true, pattern: /^[0-9]{11}$/ })} placeholder="Phone Number" className="w-full border p-2.5 rounded-xl dark:bg-gray-700" />
              <input {...register("userAddress", { required: true })} placeholder="Address" className="w-full border p-2.5 rounded-xl dark:bg-gray-700" />

              <div>
                <label className="block text-xs font-medium mb-1">Delivery Time</label>
                <select {...register("deliveryMethodId", { required: true })} className="w-full border p-2.5 rounded-xl dark:bg-gray-700">
                  {deliveryMethods.map((method) => (
                    <option key={method.id} value={method.id}>
                      {/* 2. REMOVED KEYWORDS: Showing only time and price */}
                      {method.deliveryTime} — {method.price === 0 ? "FREE" : `${method.price} LE`}
                    </option>
                  ))}
                </select>
              </div>

              <select {...register("paymentMethod", { required: true })} className="w-full border p-2.5 rounded-xl dark:bg-gray-700">
                <option value={1}>Cash on Delivery</option>
                <option value={2}>Visa Card</option>
              </select>

              <button type="submit" disabled={loading} className="w-full bg-[#009DDC] text-white py-3 rounded-xl font-bold cursor-pointer">
                {loading ? "Processing..." : `Pay ${finalTotal.toFixed(2)} LE`}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}