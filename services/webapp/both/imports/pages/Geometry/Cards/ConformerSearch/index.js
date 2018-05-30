/* eslint-disable */
import React from 'react';
import { GeometryOptimizationCard } from '../GeometryOptimization';

const ConformerSearchCard = ({ conformerSearches }) => (
  <div>
    <GeometryOptimizationCard
      title="Conformation Search"
      geometryOptimizations={conformerSearches}
    />
  </div>
);

export { ConformerSearchCard };
export default ConformerSearchCard;
