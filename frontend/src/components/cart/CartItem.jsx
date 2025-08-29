'use client';
import { useContext, useState } from 'react';
import { CartContext } from '@/context/core/CartContext';
import { FiTrash2 } from 'react-icons/fi';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = async (newQuantity) => {
    if(newQuantity < 1 || newQuantity > 10) return;
    setLoading(true);
    try {
      await updateQuantity(item.id, newQuantity);
      setQuantity(newQuantity);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 py-4 border-b">
      <img src={item.image} alt={item.title} className="w-24 h-24 object-contain flex-shrink-0" />

      <div className="flex-1">
        <h3 className="font-medium">{item.title}</h3>
        <p className="text-sm text-gray-600">{item.variant}</p>
        
        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center border rounded">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity === 1 || loading}
              className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
            >
              -
            </button>
            <span className="px-4">{loading ? '...' : quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= 10 || loading}
              className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="text-red-600 hover:text-red-700 p-2"
            aria-label="Remove item"
          >
            <FiTrash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="w-24 text-right">
        <p className="font-medium">₹{item.price * quantity}</p>
        {item.originalPrice && (
          <p className="text-sm text-gray-500 line-through">₹{item.originalPrice * quantity}</p>
        )}
      </div>
    </div>
  );
}