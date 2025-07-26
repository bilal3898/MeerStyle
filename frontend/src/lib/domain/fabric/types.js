// lib/domain/fabric/index.js
export * from './calculator';
export * from './types';
export { FabricCalculationError } from './calculator';

export const FABRIC_WIDTH_OPTIONS = {
  NARROW: 110,   // cm
  STANDARD: 140,
  WIDE: 160
};

export const calculateYardage = (meters, toUnit = 'yards') => {
  const CONVERSIONS = {
    yards: 1.09361,
    inches: 39.3701
  };
  
  return meters * (CONVERSIONS[toUnit] || 1);
};

export const createFabricSwatch = (fabricType, dimensions = '10x10cm') => {
  return {
    type: fabricType,
    dimensions,
    properties: {
      weight: FABRIC_WEIGHTS.MEDIUM,
      stretch: 0
    }
  };
};