import React, { useState, useEffect, useContext, useCallback, useMemo } from "react";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";

const primaryColor = "#009DDC";

const getValidImageUrl = (url) => {
  if (!url || url === "NA")
    return "https://placehold.co/600x400/cccccc/333333?text=No+Image";
  return url.startsWith("http") ? url : `https://${url}`;
};

// ---------------- Product Card (Optimized) ----------------
// استخدمنا React.memo لمنع إعادة رسم الكارد لو الـ addingId مخصوش
const ProductCard = React.memo(({ product, openDetails, addToCart, addingId }) => (
  <div
    onClick={() => openDetails(product)}
    className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-black/40
      transition duration-300 overflow-hidden flex flex-col cursor-pointer
      hover:shadow-xl hover:-translate-y-1"
  >
    <div className="h-[18rem] overflow-hidden bg-gray-100 dark:bg-gray-700">
      <img
        src={getValidImageUrl(product.imageUrl)}
        alt={product.name}
        className="w-full h-full object-cover"
        loading="lazy" // تحميل الصورة فقط عند الحاجة
        decoding="async" // فك ضغط الصورة في الخلفية
      />
    </div>

    <div className="p-5 flex flex-col flex-grow">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
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
));

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

  // استخدام useCallback لضمان عدم تغيير تعريف الدالة مع كل Re-render
  const handleAddToCart = useCallback(async (product) => {
    try {
      setAddingId(product.id);
      await addToCart(product);
      toast.success(`${product.name} added to cart 🛒`);
    } catch {
      toast.error("Failed to add product ❌");
    } finally {
      setAddingId(null);
    }
  }, [addToCart]);

  // فتح المودال مباشرة من الداتا المخزنة بدل طلب API جديد
  const openDetails = useCallback((product) => {
    setSelectedProduct(product);
  }, []);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    Promise.all([
      axios.get("http://smartbracelet.runasp.net/api/Product"),
      axios.get("http://smartbracelet.runasp.net/api/Product/types"),
    ])
      .then(([p, t]) => {
        if (isMounted) {
          const data = p.data?.data || [];
          setProducts(data);
          setFilteredProducts(data);
          setTypes(t.data?.data || []);
        }
      })
      .catch(() => setApiError("Failed to load products"))
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => { isMounted = false; };
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

      <header className="mb-12 px-6 md:px-12 lg:px-20">
       <div className="relative group cursor-default text-left mb-8">
  <h1 className="text-5xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight">
    Our <span className="text-[#009DDC]">Products</span>
  </h1>
  {/* Animated underline like My Orders */}
  <div className="h-1.5 w-20 mt-2 rounded-full bg-gradient-to-r from-[#009DDC] to-[#00D2FF] shadow-[0_2px_10px_rgba(0,157,220,0.3)] transition-all duration-500 group-hover:w-72"></div>
  {/* Subtext */}
  <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mt-3">
    Browse our collection
  </p>
</div>


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

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#009DDC]"></div>
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

      {/* Modal - تم إبقاء نفس الديزاين مع تحسين الأداء */}
      {selectedProduct && (
        <div
          onClick={() => setSelectedProduct(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl shadow-xl relative"
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-4 text-3xl text-gray-500 cursor-pointer hover:text-red-700  "
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-4">{selectedProduct.name}</h2>
            <img
              src={getValidImageUrl(selectedProduct.imageUrl)}
              alt={selectedProduct.name}
              className="w-full h-80 object-cover mb-4 rounded-xl"
            />
            <p className="mb-6 text-gray-600 dark:text-gray-300 text-lg">
              {selectedProduct.description}
            </p>
            <div className="flex justify-between items-center">
              <span style={{ color: primaryColor }} className="text-3xl font-bold">
                {selectedProduct.price} LE
              </span>
              <button
                disabled={addingId === selectedProduct.id}
                onClick={() => handleAddToCart(selectedProduct)}
                className="bg-[#009DDC] text-white font-medium py-3 px-8 rounded-full shadow transition cursor-pointer hover:bg-[#007AA8]"
              >
                {addingId === selectedProduct.id ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}