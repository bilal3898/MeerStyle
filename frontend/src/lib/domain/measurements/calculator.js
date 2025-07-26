// lib/domain/measurements/calculator.js

// Garment-specific calculation algorithms
export const calculateFabricRequirements = (garmentType, measurements) => {
  const calculators = {
    shirt: () => {
      const base = 2.5; // meters
      const easeFactor = 1.1;
      return base * (measurements.chest / 100) * easeFactor;
    },
    pants: () => {
      const base = 1.8;
      const legFactor = measurements.inseam / 80;
      return base * legFactor;
    },
    kurta: () => {
      const base = 3.2;
      const lengthFactor = measurements.length / 100;
      return base * lengthFactor;
    }
  };

  if (!calculators[garmentType]) {
    throw new Error(`Unsupported garment type: ${garmentType}`);
  }

  return {
    fabricLength: calculators[garmentType](),
    cuttingAllowance: 0.3 // meters
  };
};

export const calculateBodyMassIndex = (weightKg, heightCm) => {
  const heightMeters = heightCm / 100;
  return weightKg / (heightMeters * heightMeters);
};