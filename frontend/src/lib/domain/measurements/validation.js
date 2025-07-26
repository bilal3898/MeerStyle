// lib/domain/measurements/validation.js
import { z } from 'zod';

export const MeasurementError = (message) => ({
  code: 'INVALID_MEASUREMENT',
  message
});

const baseSchema = z.object({
  chest: z.number().min(20).max(200),
  waist: z.number().min(20).max(200),
  hip: z.number().min(20).max(200)
});

export const shirtSchema = baseSchema.extend({
  sleeveLength: z.number().min(30).max(100),
  shoulderWidth: z.number().min(30).max(80)
});

export const pantsSchema = baseSchema.extend({
  inseam: z.number().min(60).max(130),
  thigh: z.number().min(40).max(80)
});

export const validateMeasurements = (garmentType, measurements) => {
  const validators = {
    shirt: shirtSchema,
    pants: pantsSchema,
    kurta: baseSchema
  };

  const validator = validators[garmentType];
  if (!validator) throw MeasurementError('Invalid garment type');

  const result = validator.safeParse(measurements);
  
  if (!result.success) {
    const errors = result.error.errors.map(err => ({
      field: err.path[0],
      message: err.message
    }));
    throw MeasurementError('Invalid measurements', errors);
  }

  // Custom business rule validation
  if (measurements.waist > measurements.chest * 1.1) {
    throw MeasurementError('Waist measurement exceeds maximum allowed ratio');
  }

  return true;
};