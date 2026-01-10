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

// ---------------- Product Card ----------------
const ProductCard = ({ product, openDetails, addToCart, addingId }) => (
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
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3 line-clamp-1">
        {product.name}
      </h3>

      <p className="text-gray-500 dark:text-gray-400 mb-6 flex-grow line-clamp-2">
        {product.description}
      </p>

      <div className="flex justify-between items-center mt-auto pt-3">
        <span style={{ color: primaryColor }} className="text-2xl font-bold">
          {product.price} LE
        </span>

        <button
          disabled={addingId === product.id}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className={`bg-[#009DDC] text-white font-medium py-3 px-6 rounded-full shadow
            transition flex items-center justify-center gap-2 cursor-pointer
            ${
              addingId === product.id
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-[#007AA8] hover:scale-105 active:scale-95"
            }`}
        >
          {addingId === product.id ? (
            <>
              <span className="w-4 h-4 border-2 border-white/70 border-t-white rounded-full animate-spin"></span>
              Adding...
            </>
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </div>
  </div>
);

// ---------------- Modal ----------------
const ProductDetailsModal = ({ product, closeModal, addToCart, addingId }) => {
  if (!product) return null;

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 cursor-pointer "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl shadow-xl relative"
      >
        <button
          onClick={closeModal}
className="absolute top-3 right-4 text-3xl text-gray-400 cursor-pointer 
             transition-all duration-300 ease-in-out
             hover:scale-125 hover:text-red-600 active:scale-95"        >
          &times;
        </button>

        <h2 className="text-3xl font-bold mb-4">{product.name}</h2>

        <img
          src={getValidImageUrl(product.imageUrl)}
          alt={product.name}
          className="w-full h-80 object-cover mb-4 rounded-xl"
        />

        <p className="mb-6 text-gray-600 dark:text-gray-300 text-lg">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <span style={{ color: primaryColor }} className="text-3xl font-bold">
            {product.price} LE
          </span>

          <button
            disabled={addingId === product.id}
            onClick={() => addToCart(product)}
            className={`bg-[#009DDC] text-white font-medium py-3 px-8 rounded-full shadow
              transition flex items-center gap-2 cursor-pointer
              ${
                addingId === product.id
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-[#007AA8]"
              }`}
          >
            {addingId === product.id ? (
              <>
                <span className="w-4 h-4 border-2 border-white/70 border-t-white rounded-full animate-spin"></span>
                Adding...
              </>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------------- Main Component ----------------
export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addingId, setAddingId] = useState(null);

  const { addToCart } = useContext(CartContext);

  const handleAddToCart = async (product) => {
    try {
      setAddingId(product.id);
      await addToCart(product);
      toast.success(`${product.name} added to cart 🛒`);
    } catch {
      toast.error("Failed to add product ❌");
    } finally {
      setAddingId(null);
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
        console.log('====================================');
        console.log(p);
        console.log('====================================');
        setFilteredProducts(p.data?.data || []);
        setTypes(t.data?.data || []);
      })
      .catch(() => setApiError("Failed to load products"))
      .finally(() => setIsLoading(false));
  }, []);

  const filterByType = (type) => {
    setSelectedType(type);
    setFilteredProducts(
      type === "All" ? products : products.filter((p) => p.productType === type)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-20">
      <Toaster position="top-center" />

      {/* Header / Categories */}
      <header className="mb-12 px-6 md:px-12 lg:px-20">
        <h1 className="text-5xl font-extrabold text-gray-800 dark:text-gray-100 border-b-8 border-[#009DDC] inline-block pb-3 mb-8">
          Our Products
        </h1>

        <div className="flex flex-wrap gap-3 mt-4">
          <button
            onClick={() => filterByType("All")}
            className={`px-6 py-2 cursor-pointer rounded-full font-semibold transition-all duration-300 ${
              selectedType === "All"
                ? "bg-[#009DDC] text-white shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            All
          </button>
          {types.map((type) => (
            <button
              key={type.id}
              onClick={() => filterByType(type.name)}
              className={`px-6 py-2 rounded-full cursor-pointer font-semibold transition-all duration-300 ${
                selectedType === type.name
                  ? "bg-[#009DDC] text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>
      </header>

      {/* Products Grid / Loading */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#009DDC]"></div>
        </div>
      ) : apiError ? (
        <div className="text-center text-red-500 text-xl">{apiError}</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-2xl">
          No products found in this category.
        </div>
      ) : (
        <div className="px-6 md:px-12 lg:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              openDetails={openDetails}
              addToCart={handleAddToCart}
              addingId={addingId}
            />
          ))}
        </div>
      )}

      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          closeModal={() => setSelectedProduct(null)}
          addToCart={handleAddToCart}
          addingId={addingId}
        />
      )}
    </div>
  );
}
