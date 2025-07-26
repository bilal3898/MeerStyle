// lib/domain/fabric/calculator.js

export class FabricCalculationError extends Error {
  constructor(message) {
    super(message);
    this.name = "FabricCalculationError";
  }
}

export const calculateFabricRequirements = (
  garmentType, 
  measurements,
  options = {}
) => {
  const DEFAULTS = {
    fabricWidth: 140, // cm
    shrinkageAllowance: 0.1,
    patternRepeat: 0,
    cuttingStyle: 'normal'
  };
  
  const config = { ...DEFAULTS, ...options };
  
  const baseCalculations = {
    shirt: () => {
      const baseLength = measurements.chest * 2 + measurements.sleeveLength;
      return baseLength / 100; // convert cm to meters
    },
    pants: () => {
      const baseLength = measurements.inseam * 2 + measurements.waist;
      return baseLength / 100 * 1.2;
    },
    dress: () => {
      return (measurements.chest + measurements.hip) / 75;
    }
  };

  if (!baseCalculations[garmentType]) {
    throw new FabricCalculationError(`Unsupported garment type: ${garmentType}`);
  }

  try {
    let baseLength = baseCalculations[garmentType]();
    
    // Apply adjustments
    const widthAdjustment = config.fabricWidth < 140 ? 1.2 : 1;
    const shrinkage = baseLength * config.shrinkageAllowance;
    const patternAllowance = config.patternRepeat * 0.05;
    const cuttingAdjustment = config.cuttingStyle === 'conservative' ? 1.15 : 1;

    return {
      baseLength: baseLength,
      totalRequired: Number(
        (baseLength * widthAdjustment + shrinkage + patternAllowance) 
        * cuttingAdjustment
      ).toFixed(2),
      breakdown: {
        shrinkage,
        patternAllowance,
        cuttingAdjustment
      }
    };
  } catch (error) {
    throw new FabricCalculationError(`Calculation failed: ${error.message}`);
  }
};

export const calculateFabricCost = (fabricType, length) => {
  const PRICES = {
    cotton: 2.5, // USD per meter
    silk: 8.0,
    linen: 4.0,
    wool: 6.5
  };

  if (!PRICES[fabricType]) {
    throw new FabricCalculationError(`Invalid fabric type: ${fabricType}`);
  }

  return (PRICES[fabricType] * length).toFixed(2);
};