// lib/errors/MeasurementError.js

import { ApiError } from './ApiError.js';

/**
 * Measurement-specific Error Class
 * @extends ApiError
 */
export class MeasurementError extends ApiError {
  /**
   * @param {string} measurementType - Type of measurement (e.g., 'chest', 'waist')
   * @param {number} invalidValue - Invalid value received
   * @param {object} [details={}] - Optional extra context (e.g., user ID, input source)
   */
  constructor(measurementType, invalidValue, details = {}) {
    const message = `Invalid ${measurementType} value: ${invalidValue}`;
    const errorDetails = {
      ...details,
      measurementType,
      invalidValue
    };

    super(message, 400, true, errorDetails);

    this.measurementType = measurementType;
    this.invalidValue = invalidValue;
    this.errorCode = 'MEASUREMENT_VALIDATION_ERROR';

    Object.setPrototypeOf(this, MeasurementError.prototype);
  }
}
