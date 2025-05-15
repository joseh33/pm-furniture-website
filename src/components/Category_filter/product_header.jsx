import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from "../context_API/cart_context.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase.js"; 

const ProductHeader = ({ total, searchQuery, setSearchQuery }) => {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error.message);
        alert("Failed to logout. Please try again.");
      });
  };

  const handleHistoryClick = () => {
    navigate("/order-history");
  };

  return (
    <div className="flex flex-col gap-4 mb-4">
      {/* Top row: Left and Right side */}
      <div className="flex justify-between items-center">
        {/* Left side */}
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-gray-500">Showing 1-15 of {total} results</p>
        </div>

        {/* Right side: Cart, History, Logout */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link to="/cart" className="relative text-gray-600 hover:text-blue-600 flex items-center gap-1">
            <i className="fas fa-shopping-cart text-xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
            <span className="hidden sm:block">Cart</span>
          </Link>

          <div 
            className="flex flex-col items-center cursor-pointer text-gray-600 hover:text-blue-600"
            onClick={handleHistoryClick} 
            title="Order History"
          >
            <i className="fas fa-history text-xl"></i>
            <span className="hidden sm:block text-sm">History</span>
          </div>

          <span 
            onClick={handleLogout}
            className="text-gray-600 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
          >
            <i className="fas fa-sign-out-alt text-xl"></i>
            <span className="hidden sm:block">Logout</span>
          </span>
        </div>
      </div>

      {/* Bottom row: Search bar centered */}
      <div className="w-full max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search by name, category, etc..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
};

export default ProductHeader;
