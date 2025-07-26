// lib/types/measurement.d.ts

export interface BodyMeasurement {
  userId: string;
  height: number; // in cm
  chest: number;
  waist: number;
  hips: number;
  shoulder: number;
  sleeveLength: number;
  inseam: number;
  neck: number;
  wrist?: number;
  thigh?: number;
  ankle?: number;
  notes?: string; // custom tailoring notes
  uploadedAt?: Date;
}
