// InteriorTile.jsx
import React from 'react';

const InteriorTile = ({ imageUrl, altText, title, description, buttonText }) => {
  return (
    <section className="relative rounded-xl overflow-hidden mx-4 my-8">
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-[400px] object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {title}
        </h2>
        <p className="text-md md:text-lg mb-6 max-w-2xl">
          {description}
        </p>
      </div>
    </section>
  );
};

export default InteriorTile;
