import React from 'react';

const OfferTile = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-xl shadow-md text-center">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default OfferTile;
