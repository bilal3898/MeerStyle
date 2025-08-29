'use client';
import { useModal } from '@/context/ui/ModalContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function SizeGuideModal({ garmentType }) {
  const { closeModal } = useModal();
  
  // Sample size data structure
  const sizeChart = {
    shirt: [
      { size: 'S', chest: 38, waist: 34, length: 28 },
      { size: 'M', chest: 40, waist: 36, length: 29 },
      // Add more sizes
    ],
    // Add other garment types
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={closeModal}
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          className="bg-white rounded-xl max-w-2xl w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{garmentType} Size Guide</h2>
            <button
              onClick={closeModal}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="Close size guide"
            >
              ✕
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Size</th>
                  <th className="px-4 py-2">Chest (cm)</th>
                  <th className="px-4 py-2">Waist (cm)</th>
                  <th className="px-4 py-2">Length (cm)</th>
                </tr>
              </thead>
              <tbody>
                {sizeChart[garmentType].map((size) => (
                  <tr key={size.size} className="border-t">
                    <td className="px-4 py-2 font-medium">{size.size}</td>
                    <td className="px-4 py-2 text-center">{size.chest}</td>
                    <td className="px-4 py-2 text-center">{size.waist}</td>
                    <td className="px-4 py-2 text-center">{size.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-sm text-gray-600">
            <p>* Measurements may vary slightly based on fabric stretch</p>
            <p>* For custom sizing, use our measurement tool</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}