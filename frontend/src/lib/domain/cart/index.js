// lib/domain/cart/index.js
export * from './operations';
export * from './pricing';
export * from './errors';

export const CART_ITEM_LIMIT = 50;
export const MAX_QUANTITY_PER_ITEM = 10;

export const validateCartQuantities = (cart) => {
  if (cart.length > CART_ITEM_LIMIT) {
    throw new CartValidationError(`Cart cannot exceed ${CART_ITEM_LIMIT} items`);
  }
  
  cart.forEach(item => {
    if (item.quantity > MAX_QUANTITY_PER_ITEM) {
      throw new CartValidationError(
        `Maximum ${MAX_QUANTITY_PER_ITEM} units per item`
      );
    }
  });
};

export const mergeCarts = (localCart, remoteCart) => {
  const merged = [...remoteCart];
  
  localCart.forEach(localItem => {
    const existing = merged.find(item => item.id === localItem.id);
    if (!existing) {
      merged.push(localItem);
    } else {
      existing.quantity = Math.min(
        existing.quantity + localItem.quantity,
        MAX_QUANTITY_PER_ITEM
      );
    }
  });
  
  return merged.slice(0, CART_ITEM_LIMIT);
};