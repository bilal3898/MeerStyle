// lib/utils/formatters.js

/**
 * Format currency with Indian numbering system
 * @param {number} amount - Amount in rupees
 * @param {boolean} showSymbol - Show ₹ symbol
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, showSymbol = true) => {
  if (isNaN(amount)) return '₹---';
  
  const formatter = new Intl.NumberFormat('en-IN', {
    style: showSymbol ? 'currency' : 'decimal',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return showSymbol 
    ? formatter.format(amount)
    : formatter.format(amount).replace('₹', '').trim();
};

/**
 * Format date in Indian convention (DD/MM/YYYY)
 * @param {Date|string} date - Date object or ISO string
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  const d = new Date(date);
  if (isNaN(d)) return 'Invalid Date';
  
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

/**
 * Format body measurements with units
 * @param {number} cm - Measurement in centimeters
 * @param {'cm'|'m'|'inch'} unit - Target unit
 * @returns {string} Formatted measurement
 */
export const formatMeasurement = (cm, unit = 'cm') => {
  if (isNaN(cm)) return '--';
  
  const conversions = {
    cm: v => `${v.toFixed(1)} cm`,
    m: v => `${(v/100).toFixed(2)} m`,
    inch: v => `${(v/2.54).toFixed(1)}"`
  };

  return conversions[unit]?.(cm) || 'Invalid unit';
};