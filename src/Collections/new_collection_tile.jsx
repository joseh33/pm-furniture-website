import React from 'react';



const CollectionTile = ({ title, price, badge, image, colors }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-xl shadow-md">
      {/* Badge and color options */}
      <div className="mb-3 flex justify-between items-center">
        <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">{badge}</span>
        <div className="flex space-x-1">
          {colors.map((color, index) => (
            <span key={index} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></span>
          ))}
        </div>
      </div>

      {/* Image */}
      <img src={image} alt={title} className="w-full h-40 object-contain rounded-md mb-4"/>

      {/* Title, Price, and Add to Cart */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-sm mb-1">{title}</h3>
          <p className="font-bold text-gray-800">{price}</p>
        </div>
        <button className="text-gray-500 hover:text-black">
          <i className="fas fa-shopping-bag"></i>
        </button>
      </div>
    </div>
  );
};

export default CollectionTile;
