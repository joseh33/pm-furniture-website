// TestimonialTile.jsx

import React from 'react';

const TestimonialTile = ({ name, role, company, rating, image, title, review }) => {
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center w-full mb-4">
        <img
          src={avatarUrl}
          alt={`Avatar of ${name}`}
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">
            {role} at {company}
          </p>
        </div>
        <div className="ml-auto flex">
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              &#9733;
            </span>
          ))}
        </div>
      </div>
      <img
        src={image}
        alt="Product"
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h4 className="text-lg font-semibold text-center">{title}</h4>
      <p className="mt-2 text-gray-700 text-center">{review}</p>
    </div>
  );
};

export default TestimonialTile;
