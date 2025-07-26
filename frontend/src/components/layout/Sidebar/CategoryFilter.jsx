'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function CategoryFilter({ categories }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState(
    new Set(searchParams.getAll('category'))
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    
    if(selectedCategories.size > 0) {
      params.delete('category');
      selectedCategories.forEach(cat => params.append('category', cat));
    } else {
      params.delete('category');
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [selectedCategories]);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      const next = new Set(prev);
      next.has(category) ? next.delete(category) : next.add(category);
      return next;
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Filter Products</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <label
            key={category}
            className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedCategories.has(category)}
              onChange={() => handleCategoryChange(category)}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="capitalize">{category.replace('-', ' ')}</span>
          </label>
        ))}
      </div>
    </div>
  );
}