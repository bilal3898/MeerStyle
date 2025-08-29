import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ mobile }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // Debounce search input
  useEffect(() => {
    if (query.trim()) {
      setIsTyping(true);
      const handler = setTimeout(() => {
        fetchSuggestions(query);
        setIsTyping(false);
      }, 300);
      
      return () => clearTimeout(handler);
    }
  }, [query]);

  const fetchSuggestions = async (searchText) => {
    // Implement actual search API call
    const mockSuggestions = ['Cotton Shirts', 'Silk Sarees', 'Designer Kurtas'];
    setSuggestions(mockSuggestions.filter(item => 
      item.toLowerCase().includes(searchText.toLowerCase())
    ));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className={`relative ${mobile ? 'w-full' : 'w-64'}`}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search fabrics, designs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            mobile ? 'text-base' : 'text-sm'
          }`}
        />
        
        {isTyping && (
          <div className="absolute right-3 top-2.5">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          </div>
        )}
      </form>

      {suggestions.length > 0 && !isTyping && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion}
              onClick={() => setQuery(suggestion)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}