import React from "react";
import { useCart } from "../context_API/cart_context.jsx";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md relative flex flex-col justify-between h-80"> {/* Fixed height for consistency */}
      {product.discount && (
        <div className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full absolute top-2 left-2 z-10">
          -{product.discount}%
        </div>
      )}
      <div className="relative flex-grow">
        <img
          src={product.image}
          alt={product.name}
          className="mx-auto h-40 w-full object-contain" // Fixed image height and width for consistency
        />
        <button className="absolute top-2 right-2">
          <i className="fas fa-heart text-gray-400 hover:text-red-500"></i>
        </button>
      </div>
      <div className="mt-4 text-sm font-semibold">{product.name}</div>
      <div className="text-sm text-gray-500 line-through">${product.originalPrice}</div>
      <div className="text-md font-bold">${product.price}</div>
      <button
        onClick={() => addToCart(product)} // Trigger addToCart with the product
        className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-full"
      >
        <i className="fas fa-shopping-cart"></i> Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
