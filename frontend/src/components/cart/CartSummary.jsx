'use client';
import { useContext, useState } from 'react';
import { CartContext } from '@/context/core/CartContext';
import { Link } from 'react-router-dom';

export default function CartSummary() {
  const { cartItems } = useContext(CartContext);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 99;
  const taxes = subtotal * 0.18;
  const total = subtotal + shipping + taxes;

  const handleCouponApply = async (e) => {
    e.preventDefault();
    // Implement coupon validation API call
  };

  if(cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/products" className="text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-6">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal ({cartItems.length} items)</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
        </div>

        <div className="flex justify-between">
          <span>Taxes (18%)</span>
          <span>₹{taxes.toFixed(2)}</span>
        </div>

        <form onSubmit={handleCouponApply} className="flex gap-2">
          <input
            type="text"
            placeholder="Coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1 px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Apply
          </button>
        </form>
        {couponError && <p className="text-red-500 text-sm">{couponError}</p>}

        <div className="pt-4 border-t">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <Link
          to="/checkout"
          className="block w-full bg-blue-600 text-white text-center py-3 rounded hover:bg-blue-700 mt-6"
        >
          Proceed to Checkout
        </Link>

        <Link to="/products" className="block text-center text-blue-600 hover:underline mt-4">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}