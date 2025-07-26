// lib/hooks/useCartOperations.js
import { useState, useCallback } from 'react';
import { 
  addOrUpdateItem,
  removeItem,
  applyCouponToCart,
  calculateTotal
} from '../domain/cart';

export const useCartOperations = (initialCart = []) => {
  const [cart, setCart] = useState(initialCart);
  const [coupon, setCoupon] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const addItem = useCallback((item) => {
    setCart(prev => addOrUpdateItem(prev, item));
  }, []);

  const removeItemById = useCallback((itemId) => {
    setCart(prev => removeItem(prev, itemId));
  }, []);

  const applyCoupon = useCallback(async (couponCode) => {
    setIsProcessing(true);
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const updatedCart = applyCouponToCart(cart, couponCode);
      setCart(updatedCart);
      setCoupon(couponCode);
    } finally {
      setIsProcessing(false);
    }
  }, [cart]);

  const cartTotal = calculateTotal(cart);

  const resetCart = useCallback(() => {
    setCart([]);
    setCoupon(null);
  }, []);

  return {
    cart,
    addItem,
    removeItem: removeItemById,
    applyCoupon,
    coupon,
    cartTotal,
    isProcessing,
    resetCart
  };
};