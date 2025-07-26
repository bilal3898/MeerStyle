// lib/utils/sleep.js

/**
 * Simulate delay for async operations
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};