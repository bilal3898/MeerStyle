import { useContext } from 'react';
import { CartContext } from '../core/CartContext';

/**
 * useCart - Custom hook to consume cart context
 * @returns {{
 *   cart: Array,
 *   cartCount: number,
 *   cartTotal: number,
 *   addToCart: Function,
 *   removeFromCart: Function,
 *   clearCart: Function,
 *   loading: boolean
 * }}
 */
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('useCart called outside of CartProvider');
    }
    throw new Error('useCart must be used within a CartProvider');
  }

  return {
    cart: context.cart,
    cartCount: context.cart.length,
    cartTotal: context.cart.reduce((total, item) => total + item.price * item.quantity, 0),
    addToCart: context.addToCart,
    removeFromCart: context.removeFromCart,
    clearCart: context.clearCart,
    loading: context.loading
  };
};
