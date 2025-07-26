// lib/errors/ApiError.js

/**
 * Custom API Error for structured error handling
 * @extends Error
 */
export class ApiError extends Error {
  /**
   * @param {string} message - Human-readable error message
   * @param {number} [statusCode=500] - HTTP status code
   * @param {boolean} [isOperational=true] - Whether it's an operational error
   * @param {object} [details={}] - Extra metadata for debugging/logging
   */
  constructor(message, statusCode = 500, isOperational = true, details = {}) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;
    this.timestamp = new Date().toISOString();

    // Capture stack trace properly in V8 (Node, Chrome)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    // Fix prototype chain when using Babel or older environments
    Object.setPrototypeOf(this, new.target.prototype);
  }

  /**
   * Converts error to plain object (useful for JSON APIs)
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      isOperational: this.isOperational,
      details: this.details,
      timestamp: this.timestamp
    };
  }
}
