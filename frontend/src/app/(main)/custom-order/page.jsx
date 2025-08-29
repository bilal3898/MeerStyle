// src/app/(main)/custom-order/page.jsx
import { useCart } from '@/context/hooks/useCart';
import FabricCard from '@/components/fabric/FabricCard';

export default function CustomOrderPage() {
  const { cart } = useCart();
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Custom Order</h2>
      <p className="text-gray-600">Build your custom outfit. Cart items: {cart.length}</p>
      {/* TODO: Implement full custom order UI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {/* Example usage with mocked data to verify wiring */}
        <FabricCard fabric={{ image: '/assets/ui/banner.jpg', name: 'Sample Fabric', price: 999, tags: ['Cotton','Soft'] }} />
      </div>
    </div>
  );
}