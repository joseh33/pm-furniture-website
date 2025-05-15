// InteriorSection.jsx
import React from 'react';
import InteriorTile from "./hero_tile.jsx";  // Import the correct component
import interiorData from "./hero_data.jsx";

const InteriorSection = () => {
  return <InteriorTile {...interiorData} />;
};

export default InteriorSection;
