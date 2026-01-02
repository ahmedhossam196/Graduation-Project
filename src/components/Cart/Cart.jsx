import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import cartIcon from "../../assets/cart-empty.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";

export default function Cart() {
  const {
    cartItems,
    getCartItems,
    removeCartItem,
    updateQuantity,
    clearCart,
    isLoading,
  } = useContext(CartContext);

  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    getCartItems();
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const form = useForm({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      userAddress: "",
      paymentMethod: 1,
    },
  });

  const { register, handleSubmit } = form;

  function handelOrder(data) {
    axios
      .post("http://smartbracelet.runasp.net/api/address", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then(() => {
        setShowCheckout(false);
        clearCart();
      })
      .catch(console.log);
  }

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6">
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
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="text-[#009DDC] hover:text-[#007AA8] cursor-pointer transition-transform active:scale-125"
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
                  Shipping <span>Free</span>
                </p>
              </div>
              <p className="flex justify-between font-bold text-2xl md:text-3xl text-gray-800 dark:text-gray-100 mb-6">
                Total{" "}
                <span className="text-[#009DDC]">{total.toFixed(2)} LE</span>
              </p>

              <button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-[#009DDC] hover:bg-[#007AA8] cursor-pointer text-white py-4 rounded-2xl font-bold mb-3 shadow-xl transition-transform active:scale-95"
              >
                Checkout Now
              </button>
              <button
                onClick={clearCart}
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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in"
          onClick={() => setShowCheckout(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 p-8 rounded-3xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
                Shipping Info
              </h2>
              <button
                onClick={() => setShowCheckout(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-xl md:text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit(handelOrder)} className="space-y-4">
              {["fullName", "phoneNumber", "userAddress"].map((field, idx) => (
                <div key={idx}>
                  <label className="block text-sm md:text-base font-medium mb-1 text-gray-700 dark:text-gray-300 capitalize">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    {...register(field, { required: true })}
                    placeholder={
                      field === "fullName"
                        ? "John Doe"
                        : field === "phoneNumber"
                        ? "012xxxxxxx"
                        : "Street, City, Building"
                    }
                    className="w-full border dark:border-gray-600 dark:bg-gray-700 p-3 rounded-2xl focus:ring-2 focus:ring-[#009DDC] outline-none transition-shadow shadow-sm hover:shadow-md"
                  />
                </div>
              ))}

              <button className="w-full bg-[#009DDC] hover:bg-[#007AA8] cursor-pointer text-white py-4 rounded-2xl font-bold mt-4 shadow-xl transition-transform active:scale-95">
                Confirm & Pay
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
