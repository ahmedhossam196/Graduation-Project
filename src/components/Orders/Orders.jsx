import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const primaryColor = "#009DDC";

// Currency formatter - using LE instead of USD
const formatCurrency = (value) =>
  `${Number(value).toFixed(2)} LE`;

// ProgressBar Component - More compact
const ProgressBar = ({ step }) => {
  const steps = ["Processing", "Shipped", "Delivered"];
  const progressWidth = ((step - 1) / (steps.length - 1)) * 100 + "%";

  return (
    <div className="w-full py-4 relative flex items-center justify-between">
      {/* Background Line */}
      <div className="absolute left-0 top-1/2 w-full h-1.5 bg-gray-100 dark:bg-gray-700 -translate-y-1/2 rounded-full"></div>
      {/* Progress Fill */}
      <div
        className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full transition-all duration-1000"
        style={{ width: progressWidth, backgroundColor: primaryColor }}
      ></div>
      {/* Steps */}
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

// Helper function to get valid image URL
const getValidImageUrl = (url) => {
  if (!url || url === "NA") return "https://placehold.co/200x200/cccccc/333333?text=No+Image";
  return url.startsWith("http") ? url : `https://${url}`;
};

// ItemCard Component - More compact
const ItemCard = ({ item }) => {
  // Handle different possible API response structures
  const itemName = item.name || item.productName || "Unknown Product";
  const itemImg = item.img || item.imageUrl || item.pictureUrl || "";
  const itemQty = item.qty || item.quantity || 1;
  const itemPrice = item.price || 0;

  return (
    <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
      <img 
        src={getValidImageUrl(itemImg)} 
        alt={itemName} 
        className="w-16 h-16 object-cover rounded-lg shadow border-2 border-white dark:border-gray-700"
        onError={(e) => {
          e.target.src = "https://placehold.co/200x200/cccccc/333333?text=No+Image";
        }}
      />
      <div className="flex-grow">
        <h5 className="text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 line-clamp-1">{itemName}</h5>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">Qty: {itemQty}</p>
      </div>
      <div className="text-right">
        <p className="text-base md:text-lg font-bold text-gray-900 dark:text-gray-100">{formatCurrency(itemPrice)}</p>
      </div>
    </div>
  );
};

// OrderCard Component
const OrderCard = ({ order, deliveryMethods }) => {
  // Handle different possible API response structures
  const deliveryMethodId = order.deliveryMethod?.id || order.deliveryMethodId;
  const method = deliveryMethods.find((m) => m.id === deliveryMethodId) || {
    shortName: "FREE",
    deliveryTime: "1-2 Weeks",
    price: 0,
    description: "",
  };

  // Handle items - could be order.items or order.orderItems
  const orderItems = order.items || order.orderItems || [];
  const itemsTotal = orderItems.reduce((acc, item) => {
    const price = item.price || 0;
    const qty = item.qty || item.quantity || 1;
    return acc + price * qty;
  }, 0);
  const finalTotal = itemsTotal + (method.price || 0);

  // Format date and time - check multiple possible field names from API
  // Priority: orderdate (lowercase from API) first, then other variations
  const orderDate = order.orderdate || 
                    order.orderDate || 
                    order.order_date || 
                    order.date || 
                    order.createdAt || 
                    order.created_at ||
                    order.createdDate ||
                    order.created_date ||
                    order.placedAt ||
                    order.placed_at ||
                    order.orderPlacedAt ||
                    order.orderPlacedDate ||
                    "N/A";
  
  let formattedDate = "N/A";
  let formattedTime = "";
  
  // Debug: Log all order fields to see what's available
  if (orderDate === "N/A") {
    console.warn("No date found for order:", order.id, "Available fields:", Object.keys(order));
  }
  
  if (orderDate !== "N/A" && orderDate) {
    try {
      let dateObj;
      
      // Handle different date formats
      if (typeof orderDate === 'number') {
        // Unix timestamp (in seconds or milliseconds)
        dateObj = new Date(orderDate > 1000000000000 ? orderDate : orderDate * 1000);
      } else if (typeof orderDate === 'string') {
        // Try parsing as ISO string or other formats
        dateObj = new Date(orderDate);
      } else {
        dateObj = new Date(orderDate);
      }
      
      // Check if date is valid
      if (!isNaN(dateObj.getTime())) {
        formattedDate = dateObj.toLocaleDateString("en-US", { 
          year: "numeric", 
          month: "long", 
          day: "numeric" 
        });
        formattedTime = dateObj.toLocaleTimeString("en-US", { 
          hour: "2-digit", 
          minute: "2-digit",
          hour12: true 
        });
      } else {
        console.warn("Invalid date format for order:", order.id, "Date value:", orderDate, "Type:", typeof orderDate);
        formattedDate = String(orderDate); // Use raw value if date parsing fails
      }
    } catch (e) {
      console.error("Error parsing order date:", e, "Order ID:", order.id, "Date value:", orderDate, "Type:", typeof orderDate);
      formattedDate = String(orderDate); // Use raw value on error
    }
  } else {
    // If no date found, log a warning with the full order object for debugging
    console.warn("No date field found for order:", order.id, "\nFull order object:", JSON.stringify(order, null, 2));
  }

  // Get status step (default to 1 if not provided)
  const statusStep = order.statusStep || order.status || 1;

  // Get payment method
  const paymentMethod = order.paymentMethod || order.address?.paymentMethod || 1;

  // Get address information
  const address = order.address || {};
  const fullName = address.fullName || order.fullName || "N/A";
  const phoneNumber = address.phoneNumber || order.phoneNumber || "N/A";
  const userAddress = address.userAddress || order.userAddress || address.address || "N/A";

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-lg p-5 md:p-6 flex flex-col transition-all hover:shadow-xl hover:-translate-y-1 w-full mb-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 gap-4">
        <div className="flex-grow">
          <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-gray-100 mb-1">Order ID: {order.id?.substring(0, 8)}...</h3>
          <div className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-semibold mb-3">
            <p>Placed on {formattedDate}</p>
            {formattedTime && (
              <p className="text-xs text-gray-400 dark:text-gray-500">Time: {formattedTime}</p>
            )}
          </div>

          {/* Address Information */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl border border-gray-200 dark:border-gray-600 mb-3">
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-2">Shipping Address:</p>
            <div className="space-y-1 text-sm text-gray-800 dark:text-gray-200">
              <p className="font-bold">{fullName}</p>
              <p className="text-gray-600 dark:text-gray-400">{userAddress}</p>
              <p className="text-gray-600 dark:text-gray-400">
                <i className="fa-solid fa-phone text-xs mr-1"></i>
                {phoneNumber}
              </p>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-blue-50/30 dark:bg-blue-900/20 p-3 rounded-xl border border-blue-100 dark:border-blue-800 mb-3">
            <p className="text-sm md:text-base font-bold text-gray-800 dark:text-gray-200">
              Delivery: <span style={{ color: primaryColor }}>{method.shortName} ({method.deliveryTime})</span>
            </p>
          </div>

          {/* Payment Info */}
          <div className="flex items-center gap-2 text-xs md:text-sm">
            <span className="font-semibold text-gray-400 dark:text-gray-500">Payment:</span>
            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold border border-gray-200 dark:border-gray-600">
              {paymentMethod === 1 ? "Cash on Delivery" : "Visa Card"}
            </span>
          </div>
        </div>

        {/* Totals */}
        <div className="text-left lg:text-right flex flex-col gap-1.5 bg-gray-50 dark:bg-gray-700 p-3 rounded-xl border border-gray-100 dark:border-gray-600 min-w-[200px] md:min-w-[220px]">
          <div className="flex justify-between">
            <p className="text-xs md:text-sm text-gray-400 dark:text-gray-500 font-semibold">Subtotal:</p>
            <p className="text-xs md:text-sm font-bold text-gray-900 dark:text-gray-100">{formatCurrency(itemsTotal)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs md:text-sm text-gray-400 dark:text-gray-500 font-semibold">Delivery Fee:</p>
            <p className="text-xs md:text-sm font-bold text-gray-900 dark:text-gray-100">
              {method.price === 0 ? "FREE" : formatCurrency(method.price)}
            </p>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-600 mt-1.5 pt-1.5">
            <p className="text-xs md:text-sm text-gray-400 dark:text-gray-500 font-semibold mb-0.5">Total Amount</p>
            <p className="text-lg md:text-2xl font-black" style={{ color: primaryColor }}>
              {formatCurrency(finalTotal)}
            </p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <h4 className="text-sm md:text-base font-black mb-2 flex items-center gap-2 text-gray-900 dark:text-gray-100">
          Order Status
        </h4>
        <ProgressBar step={statusStep} />
      </div>

      {/* Items */}
      <div className="space-y-2">
        <h4 className="text-sm md:text-base font-black mb-2 text-gray-900 dark:text-gray-100">Items Ordered</h4>
        {orderItems.length > 0 ? (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {orderItems.map((item, idx) => (
              <ItemCard key={idx} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-2 text-sm">No items found in this order.</p>
        )}
      </div>
    </div>
  );
};

// Orders Component
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("last"); // "last" or "all"
  const navigate = useNavigate();

  const fetchOrdersData = () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    const fetchOrders = axios.get("http://smartbracelet.runasp.net/api/order", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const fetchDeliveryMethods = axios.get("http://smartbracelet.runasp.net/api/order/DeliveryMethods", {
      headers: { Authorization: `Bearer ${token}` },
    });

    Promise.all([fetchOrders, fetchDeliveryMethods])
      .then(([ordersRes, methodsRes]) => {
        console.log("Orders API Response:", ordersRes.data);
        console.log("Delivery Methods API Response:", methodsRes.data);
        
        // Handle different possible response structures
        const ordersData = ordersRes.data?.data || ordersRes.data || [];
        const methodsData = methodsRes.data?.data || methodsRes.data || [];
        
        // Log order dates and all fields for debugging
        if (Array.isArray(ordersData) && ordersData.length > 0) {
          console.log("=== ORDER DATA DEBUG ===");
          console.log("First order full object:", ordersData[0]);
          console.log("All date-related fields for first order:", {
            id: ordersData[0].id,
            orderdate: ordersData[0].orderdate, // lowercase from API
            orderDate: ordersData[0].orderDate,
            order_date: ordersData[0].order_date,
            date: ordersData[0].date,
            createdAt: ordersData[0].createdAt,
            created_at: ordersData[0].created_at,
            createdDate: ordersData[0].createdDate,
            created_date: ordersData[0].created_date,
            placedAt: ordersData[0].placedAt,
            placed_at: ordersData[0].placed_at,
            orderPlacedAt: ordersData[0].orderPlacedAt,
            orderPlacedDate: ordersData[0].orderPlacedDate,
            allKeys: Object.keys(ordersData[0])
          });
          console.log("=== END DEBUG ===");
        }
        
        // Sort orders by date (most recent first) - check multiple date field names
        // Priority: orderdate (lowercase from API) first
        const sortedOrders = Array.isArray(ordersData) 
          ? [...ordersData].sort((a, b) => {
              const getDate = (order) => {
                return order.orderdate || // lowercase from API
                       order.orderDate || 
                       order.order_date || 
                       order.date || 
                       order.createdAt || 
                       order.created_at ||
                       order.createdDate ||
                       order.created_date ||
                       order.placedAt ||
                       order.placed_at ||
                       order.orderPlacedAt ||
                       order.orderPlacedDate ||
                       0;
              };
              const dateA = new Date(getDate(a));
              const dateB = new Date(getDate(b));
              return dateB - dateA; // Most recent first
            })
          : [];
        
        setOrders(sortedOrders);
        setDeliveryMethods(Array.isArray(methodsData) ? methodsData : []);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        if (err.response?.status === 401) {
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrdersData();
    
    // Listen for custom event to refresh orders (triggered after checkout)
    const handleOrderPlaced = () => {
      console.log("OrderPlaced event received, refreshing orders...");
      // Add a small delay to ensure API has processed the order
      setTimeout(() => {
        fetchOrdersData();
      }, 500);
    };
    
    window.addEventListener("orderPlaced", handleOrderPlaced);
    return () => window.removeEventListener("orderPlaced", handleOrderPlaced);
  }, [navigate]);

  // Refresh when navigating to this page
  useEffect(() => {
    const handleFocus = () => {
      fetchOrdersData();
    };
    
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#009DDC] mx-auto mb-4"></div>
          <p className="text-2xl font-black text-gray-800 dark:text-gray-200">Loading orders...</p>
        </div>
      </div>
    );
  }

  // Filter orders based on view mode
  const displayedOrders = viewMode === "last" && orders.length > 0 ? [orders[0]] : orders;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16 px-4 sm:px-6 md:px-14 lg:px-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter border-b-4 inline-block text-gray-800 dark:text-gray-100" style={{ borderBottomColor: primaryColor }}>
          My Orders
        </h1>

        <div className="flex items-center gap-3">
          {/* Refresh Button */}
          <button
            onClick={() => {
              console.log("Manual refresh triggered");
              fetchOrdersData();
            }}
            className="p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
            title="Refresh orders"
          >
            <i className="fa-solid fa-rotate text-[#009DDC]"></i>
          </button>

          {/* View Mode Toggle */}
          {orders.length > 0 && (
            <div className="flex gap-2 bg-white dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md">
              <button
                onClick={() => setViewMode("last")}
                className={`px-4 py-2 rounded-lg font-bold text-sm md:text-base transition-all ${
                  viewMode === "last"
                    ? "bg-[#009DDC] text-white shadow-md"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Last Order
              </button>
              <button
                onClick={() => setViewMode("all")}
                className={`px-4 py-2 rounded-lg font-bold text-sm md:text-base transition-all ${
                  viewMode === "all"
                    ? "bg-[#009DDC] text-white shadow-md"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                All Orders
              </button>
            </div>
          )}
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-xl md:text-2xl font-black text-gray-400 dark:text-gray-500 mb-6">No orders found.</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-[#009DDC] hover:bg-[#007AA8] text-white px-8 py-3 rounded-2xl font-bold inline-block shadow-lg transition-transform active:scale-95"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedOrders.map((order) => (
            <OrderCard key={order.id} order={order} deliveryMethods={deliveryMethods} />
          ))}
          {viewMode === "last" && orders.length > 1 && (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              Showing 1 of {orders.length} orders. Switch to "All Orders" to see all.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
