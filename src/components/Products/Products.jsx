import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";

const primaryColor = "#009DDC";

const getValidImageUrl = (url) => {
  if (!url || url === "NA")
    return "https://placehold.co/600x400/cccccc/333333?text=No+Image";
  return url.startsWith("http") ? url : `https://${url}`;
};

const ProductCard = ({ product, openDetails, addToCart }) => (
  <div
    onClick={() => openDetails(product.id)}
    className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-black/40
               transition duration-300 overflow-hidden flex flex-col cursor-pointer
               hover:shadow-xl hover:-translate-y-1"
  >
    <div className="h-[18rem] overflow-hidden">
      <img
        src={getValidImageUrl(product.imageUrl)}
        alt={product.name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>

    <div className="p-5 flex flex-col flex-grow">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
        {product.name}
      </h3>

      <p className="text-gray-500 dark:text-gray-400 mb-6 flex-grow">
        {product.description}
      </p>

      <div className="flex justify-between items-center mt-auto pt-3">
        <span style={{ color: primaryColor }} className="text-2xl font-bold">
          {product.price} LE
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="bg-[#009DDC] hover:bg-[#007AA8] text-white
                     font-medium cursor-pointer py-3 px-6 rounded-full shadow
                     transition hover:scale-105 active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

const ProductDetailsModal = ({ product, closeModal, addToCart }) => {
  if (!product) return null;

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-11/12 sm:w-3/4 md:w-1/2 shadow-xl relative"
      >
        <button
          onClick={closeModal}
          className="absolute cursor-pointer top-3 right-4 text-2xl text-gray-500 dark:text-gray-300"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          {product.name}
        </h2>

        <img
          src={getValidImageUrl(product.imageUrl)}
          alt={product.name}
          className="w-full h-64 object-cover mb-4 rounded-xl"
        />

        <p className="mb-6 text-gray-600 dark:text-gray-300">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <span
            style={{ color: primaryColor }}
            className="text-2xl font-bold"
          >
            {product.price} LE
          </span>

          <button
            onClick={() => addToCart(product)}
            className="bg-[#009DDC] hover:bg-[#007AA8] text-white
                       font-medium cursor-pointer py-3 px-6 rounded-full shadow
                       transition hover:scale-105 active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { addToCart } = useContext(CartContext);

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product);
      toast.success(`${product.name} added to cart 🛒`);
    } catch {
      toast.error("Failed to add product ❌");
    }
  };

  const openDetails = async (id) => {
    try {
      const res = await axios.get(
        `http://smartbracelet.runasp.net/api/Product/${id}`
      );
      setSelectedProduct(res.data?.data);
    } catch {
      setSelectedProduct(products.find((p) => p.id === id));
    }
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      axios.get("http://smartbracelet.runasp.net/api/Product"),
      axios.get("http://smartbracelet.runasp.net/api/Product/types"),
    ])
      .then(([p, t]) => {
        setProducts(p.data?.data || []);
        setTypes(t.data?.data || []);
      })
      .catch(() => setApiError("Failed to load products"))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-20 transition-colors">
      <Toaster position="top-center" />

      <main className="px-10">
        <h1 className="text-5xl font-extrabold text-gray-800 dark:text-gray-100 border-b-8 border-[#009DDC] inline-block pb-3 mb-12">
          Our Products
        </h1>

        {!isLoading && !apiError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                openDetails={openDetails}
                addToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

        {selectedProduct && (
          <ProductDetailsModal
            product={selectedProduct}
            closeModal={() => setSelectedProduct(null)}
            addToCart={handleAddToCart}
          />
        )}
      </main>
    </div>
  );
}
