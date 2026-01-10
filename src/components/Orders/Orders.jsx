import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const primaryColor = "#009DDC";

const formatCurrency = (value) => `${Number(value).toFixed(2)} LE`;

const ProgressBar = ({ step }) => {
  const steps = ["Processing", "Shipped", "Delivered"];
  const progressWidth = ((step - 1) / (steps.length - 1)) * 100 + "%";

  return (
    <div className="w-full py-4 relative flex items-center justify-between">
      <div className="absolute left-0 top-1/2 w-full h-1.5 bg-gray-100 dark:bg-gray-700 -translate-y-1/2 rounded-full"></div>
      <div
        className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full transition-all duration-1000"
        style={{ width: progressWidth, backgroundColor: primaryColor }}
      ></div>
      {steps.map((label, idx) => (
        <div key={label} className="relative z-10 flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${
              idx + 1 <= step ? "bg-white dark:bg-gray-800" : "bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
            }`}
            style={{ borderColor: idx + 1 <= step ? primaryColor : "" }}
          >
            {idx + 1 <= step && <div className="w-3 h-3 rounded-full" style={{ backgroundColor: primaryColor }} />}
          </div>
          <span className={`mt-1 text-sm font-bold ${idx + 1 <= step ? "text-gray-900 dark:text-gray-100" : "text-gray-400 dark:text-gray-500"}`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

const getValidImageUrl = (url) => {
  if (!url || url === "NA") return "https://placehold.co/200x200/cccccc/333333?text=No+Image";
  return url.startsWith("http") ? url : `https://${url}`;
};

const ItemCard = ({ item }) => {
  const itemName = item.name || item.productName || "Product";
  const itemImg = item.img || item.imageUrl || item.pictureUrl || "";
  const itemQty = item.qty || item.quantity || 1;
  const itemPrice = item.price || 0;

  return (
    <div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
      <img 
        src={getValidImageUrl(itemImg)} 
        alt={itemName} 
        className="w-16 h-16 object-cover rounded-lg shadow-sm border border-gray-100"
      />
      <div className="flex-grow text-left">
        <h5 className="text-base font-bold text-gray-900 dark:text-gray-100">{itemName}</h5>
        <p className="text-sm text-gray-500">Quantity: {itemQty}</p>
      </div>
      <div className="text-right">
        <p className="text-base font-bold text-gray-900 dark:text-gray-100">{formatCurrency(itemPrice)}</p>
      </div>
    </div>
  );
};

const OrderCard = ({ order, deliveryMethods }) => {
  // FIX: Look for deliveryMethodId directly or inside deliveryMethod object
  const deliveryId = order.deliveryMethodId || order.deliveryMethod?.id;
  
  // Use String() to avoid "1" !== 1 type mismatches
  const matchedMethod = deliveryMethods.find(m => String(m.id) === String(deliveryId));

  // Correct display based on your JSON data
  const deliveryDisplay = matchedMethod ? matchedMethod.deliveryTime : "1-2 Weeks";
  const deliveryCost = matchedMethod ? matchedMethod.price : 0;

  // Correct Payment Label mapping
  const pMethod = order.paymentMethod || (order.address && order.address.paymentMethod);
  const paymentLabel = (pMethod === 1 || pMethod === "1" || pMethod === "Cash") ? "Cash on Delivery" : "Visa / Card";

  const orderItems = order.items || order.orderItems || [];
  const itemsTotal = orderItems.reduce((acc, item) => acc + (item.price * (item.qty || item.quantity || 1)), 0);
  const finalTotal = itemsTotal + deliveryCost;

  const rawDate = order.orderdate || order.orderDate || order.createdAt || "N/A";
  let formattedDate = "N/A";
  if (rawDate !== "N/A") {
    const d = new Date(rawDate);
    formattedDate = isNaN(d) ? rawDate : d.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
  }

  const statusStep = order.statusStep || order.status || 1;
  const address = order.address || {};

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 mb-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b pb-6 mb-6 gap-4">
        <div className="flex-grow text-left">
          <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">Order ID: #{order.id?.substring(0, 8)}</h3>
          <p className="text-sm text-gray-500 font-semibold mb-4">Placed on {formattedDate}</p>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 mb-4 text-left">
            <p className="text-xs font-bold text-[#009DDC] uppercase mb-1">Shipping to:</p>
            <p className="text-base font-bold text-gray-900 dark:text-white">{address.fullName || order.fullName || "Customer"}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{address.userAddress || order.userAddress}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-100 dark:border-blue-800">
              <i className="fa-solid fa-truck mr-1"></i> {deliveryDisplay}
            </span>
            <span className="px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-100 dark:border-emerald-800">
              <i className="fa-solid fa-credit-card mr-1"></i> {paymentLabel}
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 min-w-[240px]">
          <div className="flex justify-between text-sm mb-2 text-gray-500 font-medium">
            <span>Subtotal:</span>
            <span className="text-gray-900 dark:text-white font-bold">{formatCurrency(itemsTotal)}</span>
          </div>
          <div className="flex justify-between text-sm mb-3 text-gray-500 font-medium">
            <span>Shipping:</span>
            <span className="text-gray-900 dark:text-white font-bold">{deliveryCost === 0 ? "FREE" : formatCurrency(deliveryCost)}</span>
          </div>
          <div className="border-t pt-3 flex justify-between items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total</span>
            <span className="text-2xl font-black text-[#009DDC]">{formatCurrency(finalTotal)}</span>
          </div>
        </div>
      </div>

      <div className="mb-8 px-2">
        <ProgressBar step={statusStep} />
      </div>

      <div className="space-y-3 text-left">
        <h4 className="text-xs font-black mb-2 uppercase tracking-widest text-gray-400">Order Contents</h4>
        {orderItems.map((item, idx) => (
          <ItemCard key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("last");
  const navigate = useNavigate();

  const fetchOrdersData = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) return navigate("/login");

    try {
      setLoading(true);
      const [ordersRes, methodsRes] = await Promise.all([
        axios.get("http://smartbracelet.runasp.net/api/order", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("http://smartbracelet.runasp.net/api/order/DeliveryMethods", { headers: { Authorization: `Bearer ${token}` } })
      ]);

      const ordersData = ordersRes.data?.data || ordersRes.data || [];
      const methodsData = methodsRes.data?.data || methodsRes.data || [];

      // DEBUGGING TABLE: Look at your browser console to see the IDs
      console.log("--- Delivery Comparison Debug ---");
      console.table(methodsData.map(m => ({ ID: m.id, Name: m.shortName, Price: m.price })));
      console.log("Order Data Samples:", ordersData.slice(0, 2).map(o => ({ 
        OrderID: o.id, 
        DeliveryID: o.deliveryMethodId || o.deliveryMethod?.id 
      })));

      const sorted = Array.isArray(ordersData) ? [...ordersData].sort((a, b) => {
        const dateA = new Date(a.orderdate || a.orderDate || a.createdAt);
        const dateB = new Date(b.orderdate || b.orderDate || b.createdAt);
        return dateB - dateA;
      }) : [];

      setOrders(sorted);
      setDeliveryMethods(methodsData);
    } catch (err) {
      if (err.response?.status === 401) navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdersData();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#009DDC]"></div>
    </div>
  );

  const displayedOrders = viewMode === "last" && orders.length > 0 ? [orders[0]] : orders;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-4 pb-16 px-4 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="relative group cursor-default text-left">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            My <span className="text-[#009DDC]">Orders</span>
          </h1>
          <div className="h-1.5 w-16 mt-2 rounded-full bg-gradient-to-r from-[#009DDC] to-[#00D2FF] shadow-[0_2px_10px_rgba(0,157,220,0.3)] transition-all duration-500 group-hover:w-full"></div>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mt-3">Track your purchases</p>
        </div>
        
        {orders.length > 0 && (
          <div className="flex bg-white dark:bg-gray-800 p-1.5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <button 
              onClick={() => setViewMode("last")} 
              className={`px-6 py-2.5 rounded-xl cursor-pointer text-sm font-bold transition-all duration-300 ${viewMode === "last" ? "bg-[#009DDC] text-white shadow-md" : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
            >
              Last Order
            </button>
            <button 
              onClick={() => setViewMode("all")} 
              className={`px-6 py-2.5 rounded-xl cursor-pointer text-sm font-bold transition-all duration-300 ${viewMode === "all" ? "bg-[#009DDC] text-white shadow-md" : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
            >
              All Orders
            </button>
          </div>
        )}
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        {displayedOrders.map((order) => (
          <OrderCard key={order.id} order={order} deliveryMethods={deliveryMethods} />
        ))}
      </div>
    </div>
  );
}