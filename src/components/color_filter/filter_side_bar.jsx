import React from 'react';

const colors = ['red', 'blue', 'green', 'white'];

const ColorFilterSidebar = ({ setColorFilter }) => {
  const handleColorChange = (e) => {
    setColorFilter(e.target.value);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">Color</h3>
      <ul className="space-y-2">
        <li>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="color"
              value=""
              onChange={handleColorChange}
            />
            <span>All</span>
          </label>
        </li>
        {colors.map((color) => (
          <li key={color}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="color"
                value={color}
                onChange={handleColorChange}
              />
              <span className="capitalize">{color}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColorFilterSidebar;
