// lib/utils/error-handler.js

export class ErrorHandler {
  /**
   * Handle API errors
   * @param {Error} error - Error object
   * @returns {string} User-friendly error message
   */
  static handleApiError(error) {
    console.error('API Error:', error);
    
    return error.response?.data?.message 
      || error.message 
      || 'Something went wrong. Please try again.';
  }

  /**
   * Handle measurement validation errors
   * @param {object} errors - Zod validation errors
   * @returns {object} Field-specific error messages
   */
  static formatMeasurementErrors(errors) {
    return errors.reduce((acc, err) => {
      acc[err.path[0]] = err.message;
      return acc;
    }, {});
  }

  /**
   * Handle critical errors
   * @param {Error} error - Error object
   */
  static handleCriticalError(error) {
    console.error('Critical Error:', error);
    // Send to error monitoring service
    if (typeof window !== 'undefined') {
      window.location.href = '/error';
    }
  }
}