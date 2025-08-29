'use strict';
import { useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import FabricDetailsModal from './FabricDetailsModal';
import { FABRIC_TYPES } from '@/lib/constants/fabricTypes';

export default function FabricCard({ fabric }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="relative group">
        <img
          src={fabric.image}
          alt={fabric.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FiHeart className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-white font-medium">{fabric.name}</h3>
          <p className="text-white text-sm">₹{fabric.price}/meter</p>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex flex-wrap gap-2">
          {fabric.tags.map(tag => (
            <span 
              key={tag}
              className="px-2 py-1 bg-gray-100 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => setShowDetails(true)}
          className="w-full text-sm text-blue-600 hover:underline"
        >
          View Details & Swatches
        </button>
      </div>

      {showDetails && (
        <FabricDetailsModal
          fabric={fabric}
          onClose={() => setShowDetails(false)}
        />
      )}
    </motion.div>
  );
}