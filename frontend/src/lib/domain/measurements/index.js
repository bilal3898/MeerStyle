// lib/domain/measurements/index.js
export * from './calculator';
export * from './validation';
export { MeasurementError } from './validation';

export const GARMENT_TYPES = {
  SHIRT: 'shirt',
  PANTS: 'pants',
  KURTA: 'kurta'
};

export const getRequiredMeasurementFields = (garmentType) => {
  const fields = {
    [GARMENT_TYPES.SHIRT]: ['chest', 'waist', 'hip', 'sleeveLength', 'shoulderWidth'],
    [GARMENT_TYPES.PANTS]: ['chest', 'waist', 'hip', 'inseam', 'thigh'],
    [GARMENT_TYPES.KURTA]: ['chest', 'waist', 'hip']
  };
  
  return fields[garmentType] || [];
};