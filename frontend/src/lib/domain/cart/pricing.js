// lib/domain/cart/pricing.js
import { formatCurrency } from '../../utils/formatters';

export const calculateSubtotal = (cartItems) => {
  return cartItems.reduce((sum, item) => 
    sum + (item.price * item.quantity) - (item.discount || 0), 0);
};

export const calculateShipping = (cart, options = {}) => {
  const DEFAULTS = {
    baseRate: 5.99,
    freeShippingThreshold: 100,
    heavyItemFee: 9.99
  };
  
  const config = { ...DEFAULTS, ...options };
  const subtotal = calculateSubtotal(cart);
  
  if (subtotal >= config.freeShippingThreshold) return 0;
  
  const hasHeavyItems = cart.some(item => 
    item.metadata?.weight === 'heavy');
  
  return hasHeavyItems 
    ? config.baseRate + config.heavyItemFee
    : config.baseRate;
};

export const calculateTaxes = (subtotal, shipping, taxRate = 0.18) => {
  return (subtotal + shipping) * taxRate;
};

export const calculateTotal = (cart, options = {}) => {
  const subtotal = calculateSubtotal(cart);
  const shipping = calculateShipping(cart, options.shipping);
  const taxes = calculateTaxes(subtotal, shipping, options.taxRate);
  
  return {
    subtotal: formatCurrency(subtotal),
    shipping: formatCurrency(shipping),
    taxes: formatCurrency(taxes),
    total: formatCurrency(subtotal + shipping + taxes),
    breakdown: {
      subtotal,
      shipping,
      taxes,
      total: subtotal + shipping + taxes
    }
  };
};

const calculateItemDiscount = (item, coupon) => {
  if (coupon.type === 'percentage') {
    return item.price * item.quantity * (coupon.value / 100);
  }
  if (coupon.type === 'fixed') {
    return Math.min(item.price * item.quantity, coupon.value);
  }
  return 0;
};