import React from 'react';
import OfferTile from "./what_we_offer_tile.jsx";
import { offersData } from "./what_we_offer_data.jsx";

const OffersSection = () => {
  return (
    <div className="bg-gray-50 py-12 px-6 sm:px-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">What We Can Offer You</h2>
      <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
        High-quality, stylish, and functional furniture designed to elevate your space with comfort and elegance.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {offersData.map((offer) => (
          <OfferTile key={offer.title} {...offer} />
        ))}
      </div>
    </div>
  );
};

export default OffersSection;
