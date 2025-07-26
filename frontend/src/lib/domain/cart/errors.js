// lib/domain/cart/errors.js
export class CartValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CartValidationError';
  }
}

export class CouponApplicationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CouponApplicationError';
  }
}

export class InventoryConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InventoryConflictError';
  }
}