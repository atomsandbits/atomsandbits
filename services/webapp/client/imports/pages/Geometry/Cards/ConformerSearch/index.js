import React from 'react';
import { GeometryOptimizationCard } from '../GeometryOptimization';

const ConformerSearchCard = ({ conformerSearches }) => (
  <div>
    {console.log(conformerSearches)}
    <GeometryOptimizationCard
      title="Conformation Search"
      geometryOptimizations={conformerSearches}
    />
  </div>
);

export { ConformerSearchCard };
export default ConformerSearchCard;
