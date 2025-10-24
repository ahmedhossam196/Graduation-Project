import React, { useState } from "react";
import { Link } from "react-router-dom";
import bracelet from "../../assets/bracelet.jpg";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import cartIcon from '../../assets/cart-empty.png';

export default function CartSection() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Linkio Bracelet",
      desc: "Health Monitoring Device",
      price: 120,
      qty: 1,
      img: bracelet,
    },
    // {
    //   id: 2,
    //   title: "Charging Dock",
    //   desc: "Magnetic Fast Charger",
    //   price: 30,
    //   qty: 1,
    //   img: null,
    // },
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

  return (
    <section className="min-h-screen bg-[#f5f5f5] flex flex-col items-center py-12 px-4 md:px-12">
      <h1 className="text-[#009DDC] text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">
        Your Cart
      </h1>

      <div className="w-full max-w-5xl">
        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-lg flex flex-col items-center">
            {/* <img src={cartIcon} alt="empty cart" className="w-32 mb-6" /> */}
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Your cart is empty
            </h2>
            <p className="opacity-90 mb-6 max-w-sm text-gray-600">
              Add some items from the products section to get started.
            </p>
            <Link
              to="/products"
              className="inline-block bg-[#009DDC] text-white px-6 py-3 rounded-xl font-bold shadow hover:scale-[1.02] transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 flex flex-col gap-4">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="flex items-center justify-between bg-white rounded-2xl p-6 hover:shadow-2xl transition-all"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 font-semibold overflow-hidden">
                        {item.img ? (
                          <img
                            src={item.img}
                            className="rounded-2xl object-cover w-full h-full"
                            alt={item.title}
                          />
                        ) : (
                          <span>No Image</span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-gray-800 text-lg font-semibold mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {item.desc}
                        </p>
                        <span className="block text-gray-800 font-bold">
                          ${item.price}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
                        <button
                          onClick={() => decrease(item.id)}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200 transition"
                        >
                          <i class="fa-solid fa-minus"></i>
                        </button>
                        <div className="px-5 py-2 font-semibold text-gray-800">
                          {item.qty}
                        </div>
                        <button
                          onClick={() => increase(item.id)}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200 transition"
                        >
                          <i class="fa-solid fa-plus"></i>
                        </button>
                      </div>

                      <div className="text-gray-800 font-semibold text-lg">
                        ${item.price * item.qty}
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="px-4 py-2 cursor-pointer bg-red-600 rounded-lg text-white hover:bg-red-700 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="md:col-span-1 bg-white rounded-2xl p-6 flex flex-col justify-between shadow-md">
                <div>
                  <h4 className="text-gray-800 text-xl font-bold mb-3">
                    Order Summary
                  </h4>
                  <div className="flex justify-between text-gray-600 mb-2">
                    Items <span>{items.length}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 mb-4">
                    Subtotal <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-3">
                    Shipping calculated at checkout
                  </div>
                </div>

                <div>
                  <button className="w-full bg-[#009DDC] cursor-pointer text-white py-3 rounded-2xl font-bold shadow hover:scale-[1.01] transition mb-3">
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={() => setItems([])}
                    className="w-full cursor-pointer border border-gray-200 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                  >
                    Clear Cart
                  </button>
                </div>
              </aside>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
