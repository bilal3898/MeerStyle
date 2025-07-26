// lib/utils/debounce.js

/**
 * Debounce function implementation
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Trigger immediately
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300, immediate = false) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(this, args);
  };
};