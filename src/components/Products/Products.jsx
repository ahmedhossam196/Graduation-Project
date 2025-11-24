import React, { useState } from 'react';
import style from "./Products.module.css";

const primaryColor = '#009DDC';

const products = [
  {
    id: 1,
    name: 'SmartCare Bracelet',
    description: 'Our flagship device. Monitors vital signs and tracks medication.',
    price: "2000 LE",
    imageUrl: 'https://images.pexels.com/photos/1080745/pexels-photo-1080745.jpeg',
    imageAlt: 'Person wearing a SmartCare Bracelet outdoors.',
  },
  {
    id: 2,
    name: 'Comfort Strap',
    description: 'High-quality, hypoallergenic silicone strap for maximum comfort and durability.',
    price: "300 LE",
    imageUrl: 'https://images.pexels.com/photos/2779018/pexels-photo-2779018.jpeg',
    imageAlt: 'Yellow and black replacement watch straps.',
  },
  {
    id: 3,
    name: 'Quick Charging Dock',
    description: 'Charge your SmartCare Bracelet fast using a magnetic dock.',
    price: "750 LE",
    imageUrl: 'https://m.media-amazon.com/images/I/515tvMYqjRL._SX385_.jpg',
    imageAlt: 'Smartwatch resting on a white charging dock.',
  },
  {
    id: 4,
    name: 'SmartBracelet V2',
    description: 'Improved features, location tracking, and a 1-year guarantee.',
    price: "2500 LE",
    imageUrl: 'https://images.pexels.com/photos/23475/pexels-photo.jpg',
    imageAlt: 'A hand wearing a SmartBracelet V2.',
  },
];

const ProductCard = ({ product, addToCart }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-md transition duration-300 
                 overflow-hidden flex flex-col cursor-pointer 
                 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Image */}
      <div className="h-[18rem] overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.imageAlt}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              'https://placehold.co/600x400/cccccc/333333?text=Image+Error';
          }}
        />
      </div>

      {/* Info section */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          {product.name}
        </h3>

        <p className="text-base text-gray-500 mb-6 flex-grow">
          {product.description}
        </p>

        {/* Price + Button */}
        <div className="flex justify-between items-center mt-auto pt-3">
          <span
            style={{ color: primaryColor }}
            className="text-2xl font-bold"
          >
            {product.price}
          </span>

          <button
            onClick={() => addToCart(product)}
            style={{ backgroundColor: primaryColor }}
            className="text-white font-medium py-3 px-6 rounded-full 
                       shadow-md transition duration-150 hover:scale-105 
                       active:scale-95 text-lg"
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#007AA8')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = primaryColor)
            }
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Products() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    console.log("Cart:", [...cart, product]);
  };

  return (
    <div className="min-h-screen bg-white font-sans pt-20 pb-20">
      <main style={{ padding: '0 52px' }}>
        {/* Heading */}
        <div
          style={{ borderBottomColor: primaryColor }}
          className="mb-16 border-b-8 inline-block pb-3"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-800">
            Our Products
          </h1>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              addToCart={addToCart} 
            />
          ))}
        </div>
      </main>
    </div>
  );
}
