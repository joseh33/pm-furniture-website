import React from 'react';

const materials = ['fabric', 'cotton', 'nylon', 'leather'];

const MaterialFilterSidebar = ({ setMaterialFilter }) => {
  const handleMaterialChange = (e) => {
    setMaterialFilter(e.target.value);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">Material</h3>
      <ul className="space-y-2">
        <li>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="material"
              value=""
              onChange={handleMaterialChange}
            />
            <span>All</span>
          </label>
        </li>
        {materials.map((material) => (
          <li key={material}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="material"
                value={material}
                onChange={handleMaterialChange}
              />
              <span className="capitalize">{material}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaterialFilterSidebar;
