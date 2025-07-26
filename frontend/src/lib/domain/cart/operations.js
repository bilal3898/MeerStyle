// lib/domain/cart/operations.js
import { z } from 'zod';
import { CartValidationError, CouponApplicationError } from './errors';

const CartItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  maxQuantity: z.number().int().positive(),
  sku: z.string(),
  metadata: z.object({
    size: z.string().optional(),
    color: z.string().optional(),
    fabricType: z.string().optional()
  }).optional()
});

export const validateCartItem = (item) => {
  const result = CartItemSchema.safeParse(item);
  if (!result.success) {
    throw new CartValidationError('Invalid cart item structure');
  }
  return true;
};

export const addOrUpdateItem = (currentCart, newItem) => {
  validateCartItem(newItem);
  
  const existingIndex = currentCart.findIndex(item => item.id === newItem.id);
  
  if (existingIndex > -1) {
    return currentCart.map((item, index) => 
      index === existingIndex 
        ? { ...item, quantity: Math.min(item.quantity + newItem.quantity, item.maxQuantity) }
        : item
    );
  }
  
  return [...currentCart, newItem];
};

export const removeItem = (cart, itemId) => {
  if (!cart.some(item => item.id === itemId)) {
    throw new CartValidationError('Item not found in cart');
  }
  return cart.filter(item => item.id !== itemId);
};

export const applyCouponToCart = (cart, coupon) => {
  if (coupon.expiresAt < Date.now()) {
    throw new CouponApplicationError('Coupon has expired');
  }
  
  if (coupon.minCartValue > calculateSubtotal(cart)) {
    throw new CouponApplicationError(
      `Cart total must be at least ${formatCurrency(coupon.minCartValue)}`
    );
  }
  
  return cart.map(item => {
    if (coupon.applicableCategories && !coupon.applicableCategories.includes(item.category)) {
      return item;
    }
    return {
      ...item,
      discount: calculateItemDiscount(item, coupon)
    };
  });
};