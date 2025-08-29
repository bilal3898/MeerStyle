'use client';
import { FiX } from 'react-icons/fi';

export default function FabricDetailsModal({ fabric, onClose }) {
  if (!fabric) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{fabric.name}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full" aria-label="Close">
            <FiX className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2">
          <p className="text-gray-700">Type: {fabric.type}</p>
          <p className="text-gray-700">Price: ₹{fabric.price}/meter</p>
          <div className="flex flex-wrap gap-2">
            {fabric.tags?.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-gray-100 rounded-full text-xs">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

