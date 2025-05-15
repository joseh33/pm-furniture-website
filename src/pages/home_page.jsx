import React, { useState, useEffect } from 'react';
import { useCart } from "../components/context_API/cart_context.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase.js";
import CategoryFilterSidebar from "../components/Category_filter/filter_side_bar.jsx";
import ColorFilterSidebar from "../components/color_filter/filter_side_bar.jsx";
import MaterialFilterSidebar from "../components/material_filter/filter_side_bar.jsx";  
import ProductHeader from "../components/Category_filter/product_header.jsx";
import ProductCard from "../components/Category_filter/product_card.jsx";
import products from "../components/Shop_data/shop_data.jsx";
import CustomOrderForm from "../components/custom/custom_order.jsx";

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { setCartItems } = useCart();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const cartRef = doc(db, "carts", user.uid);
          const cartSnap = await getDoc(cartRef);

          if (cartSnap.exists()) {
            const data = cartSnap.data();
            setCartItems(data.items || []);
          }
        } catch (error) {
          console.error("Error loading cart from Firestore:", error);
        }
      }
    });

    return () => unsubscribe();
  }, [setCartItems]);

  const handleCategoryChange = (category) => setSelectedCategory(category);
  const handleColorChange = (color) => setSelectedColor(color);
  const handleMaterialChange = (material) => setSelectedMaterial(material);

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory ? product.category === selectedCategory : true;
    const colorMatch = selectedColor ? product.color === selectedColor : true;
    const materialMatch = selectedMaterial ? product.material === selectedMaterial : true;

    const searchMatch = searchQuery
      ? (
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.material.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : true;

    return categoryMatch && colorMatch && materialMatch && searchMatch;
  });

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
      <ProductHeader
        total={filteredProducts.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex flex-row gap-6 mt-6">
        {/* Sidebar hidden on small screens, visible on md and up */}
        <div className="hidden md:flex w-40 sm:w-52 lg:w-64 shrink-0 flex-col gap-4 sticky top-24 self-start overflow-y-auto max-h-[calc(100vh-6rem)]">
          <CategoryFilterSidebar onCategoryChange={handleCategoryChange} />
          <ColorFilterSidebar setColorFilter={handleColorChange} />
          <MaterialFilterSidebar setMaterialFilter={handleMaterialChange} />
        </div>

        {/* Product grid */}
        <div className="flex-grow">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-4">No matching products found</h2>
              <p className="text-gray-600 mb-6">Let’s create a custom one for you.</p>
              <div className="mt-6 max-w-xl mx-auto">
                <CustomOrderForm />
              </div>
            </div>
          )}
        </div>
      </div>

      {filteredProducts.length > 0 && (
        <div className="mt-12">
          <CustomOrderForm />
        </div>
      )}
    </div>
  );
};

export default ShopPage;
