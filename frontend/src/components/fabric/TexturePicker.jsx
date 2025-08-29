'use client';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/lib/hooks/useDebounce';

export default function TexturePicker({ fabrics, onSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFabrics, setFilteredFabrics] = useState(fabrics);
  const debouncedQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    setFilteredFabrics(
      fabrics.filter(fabric =>
        fabric.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        fabric.tags.some(tag => tag.toLowerCase().includes(debouncedQuery.toLowerCase()))
      )
    );
  }, [debouncedQuery, fabrics]);

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search fabrics..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredFabrics.map(fabric => (
          <button
            key={fabric.id}
            onClick={() => onSelect(fabric)}
            className="group relative aspect-square overflow-hidden rounded-lg border-2 hover:border-blue-500 transition-all"
            aria-label={`Select ${fabric.name}`}
          >
            <img
              src={fabric.thumbnail}
              alt={fabric.name}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}
