import React, { useState } from 'react';

const categories = ['Bedroom', 'Living Room', 'Office', 'Kitchen', 'Outdoor', 'Decor'];

const CategoryFilterSidebar = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return (
    <div className="w-full pr-0 sm:pr-2">
      <h2 className="text-xl font-bold mb-4">Filter Option</h2>
      <div className="bg-white rounded-xl p-4 shadow">
        <h3 className="font-semibold mb-2">Category</h3>
        <ul className="space-y-2">
          <li>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="category"
                value=""
                checked={selectedCategory === ''}
                onChange={() => handleCategoryChange('')}
              />
              All
            </label>
          </li>
          {categories.map((cat) => (
            <li key={cat}>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={selectedCategory === cat}
                  onChange={() => handleCategoryChange(cat)}
                />
                {cat}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryFilterSidebar;
