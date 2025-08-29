'use client';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '@/context/core/CartContext';

export default function CartIcon() {
  const { cartItems } = useContext(CartContext);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link to="/cart" className="relative inline-flex items-center p-2 text-gray-700 hover:text-blue-600">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {itemCount}
        </span>
      )}
    </Link>
  );
}