'use client';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CategoryFilter({ categories }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [selectedCategories, setSelectedCategories] = useState(
    new Set(params.getAll('category'))
  );

  useEffect(() => {
    const next = new URLSearchParams(location.search);
    next.delete('category');
    if (selectedCategories.size > 0) {
      selectedCategories.forEach(cat => next.append('category', cat));
    }
    navigate({ pathname: location.pathname, search: next.toString() }, { replace: true });
  }, [selectedCategories, location.pathname, location.search, navigate]);

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