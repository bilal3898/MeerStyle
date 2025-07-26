// lib/constants/bodyMeasurements.js
import { BODY_MEASUREMENTS } from '@/lib/constants/bodyMeasurements';
export const BODY_MEASUREMENTS = {
  chest: { label: 'Chest (in)', min: 28, max: 60 },
  waist: { label: 'Waist (in)', min: 24, max: 50 },
  hips: { label: 'Hips (in)', min: 30, max: 60 },
  inseam: { label: 'Inseam (in)', min: 20, max: 40 },
  sleeve: { label: 'Sleeve Length (in)', min: 18, max: 38 },
  shoulder: { label: 'Shoulder Width (in)', min: 14, max: 24 },
  height: { label: 'Height (cm)', min: 140, max: 210 },
};

// For forms: get array of fields
export const BODY_MEASUREMENT_FIELDS = Object.entries(BODY_MEASUREMENTS).map(
  ([key, { label, min, max }]) => ({
    key,
    label,
    min,
    max,
  })
);
