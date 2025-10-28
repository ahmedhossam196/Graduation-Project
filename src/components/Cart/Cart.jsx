import React, { useState } from "react";
import { Link } from "react-router-dom";
import bracelet from "../../assets/bracelet.jpg";
import "@fortawesome/fontawesome-free/css/all.min.css";
import cartIcon from "../../assets/cart-empty.png";

export default function CartSection() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Linko Bracelet",
      desc: "Health Monitoring Device",
      price: 120,
      qty: 1,
      img: bracelet,
    },
    {
      id: 2,
      title: "Linko Bracelet",
      desc: "Health Monitoring Device",
      price: 120,
      qty: 1,
      img: bracelet,
    },
  ]);

  const increase = (id) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
    );
  const decrease = (id) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))
    );
  const removeItem = (id) =>
    setItems((prev) => prev.filter((i) => i.id !== id));
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center py-6 px-4 sm:px-12 transition-colors duration-300">
      <h1 className="text-[#009DDC] dark:text-[#009DDC] text-3xl sm:text-5xl font-extrabold mb-6 sm:mb-8 tracking-tight">
        Your Cart <i className="fa-solid fa-cart-shopping"></i>
      </h1>

      <div className="w-full max-w-5xl">
        {items.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 text-center shadow-lg flex flex-col items-center transition-colors duration-300">
            <img
              src={cartIcon}
              alt="empty cart"
              className="w-32 sm:w-40 mb-6"
            />
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
              Your cart is empty
            </h2>
            <p className="opacity-90 mb-6 max-w-sm text-gray-600 dark:text-gray-300">
              Add some items from the products section to get started.
            </p>
            <Link
              to="/products"
              className="inline-block bg-[#009DDC] text-white px-5 py-3 rounded-xl font-bold shadow hover:scale-[1.02] transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-4 sm:p-6 shadow-2xl transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 flex flex-col gap-4">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all"
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
                      <div className="w-full sm:w-24 h-32 sm:h-24 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center overflow-hidden shadow-inner">
                        {item.img ? (
                          <img
                            src={item.img}
                            className="object-cover w-full h-full rounded-2xl"
                            alt={item.title}
                          />
                        ) : (
                          <span className="text-gray-800 dark:text-gray-100">
                            No Image
                          </span>
                        )}
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-gray-800 dark:text-gray-100 text-lg font-semibold mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
                          {item.desc}
                        </p>
                        <span className="block text-gray-800 dark:text-gray-100 font-bold">
                          {item.price} LE
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-0">
                      <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                        <button
                          onClick={() => decrease(item.id)}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <div className="px-5 py-2 font-semibold text-gray-800 dark:text-gray-100">
                          {item.qty}
                        </div>
                        <button
                          onClick={() => increase(item.id)}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>

                      <div className="text-gray-800 dark:text-gray-100 font-semibold text-lg">
                        {item.price * item.qty} LE
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="px-2.5 py-2 cursor-pointer bg-red-600 rounded-lg text-white hover:bg-red-700 transition w-full sm:w-auto"
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="md:col-span-1 bg-white dark:bg-gray-800 rounded-3xl p-6 flex flex-col justify-between shadow-lg transition-colors duration-300">
                <div>
                  <h4 className="text-gray-800 dark:text-gray-100 text-xl font-bold mb-3">
                    Order Summary
                  </h4>
                  <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-2">
                    Items <span>{items.length}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-4">
                    Subtotal <span>{total.toFixed(2)} LE</span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Shipping calculated at checkout
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full bg-[#009DDC] cursor-pointer text-white py-3 rounded-2xl font-bold shadow hover:scale-[1.01] transition mb-3"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={() => setItems([])}
                    className="w-full border cursor-pointer border-gray-200 dark:border-gray-600 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    Clear Cart
                  </button>
                </div>
              </aside>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-white/20 dark:bg-gray-900/20 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl w-full max-w-md transition-colors duration-300">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Checkout
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#009DDC] dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#009DDC] dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+20 123 456 7890"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#009DDC] dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Address
                </label>
                <textarea
                  placeholder="123 Street, City, Country"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#009DDC] dark:bg-gray-700 dark:text-gray-100"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Payment Method
                </label>
                <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#009DDC] dark:bg-gray-700 dark:text-gray-100">
                  <option value="cash">Cash on Delivery</option>
                  <option value="card">Credit / Debit Card</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-[#009DDC] cursor-pointer text-white py-3 rounded-2xl font-bold shadow hover:scale-[1.01] transition"
              >
                Confirm Order
              </button>
              <button
                type="button"
                onClick={() => setShowCheckout(false)}
                className="w-full border cursor-pointer border-gray-300 dark:border-gray-600 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
