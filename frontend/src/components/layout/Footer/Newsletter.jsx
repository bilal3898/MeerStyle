'use client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if(response.ok) {
        toast.success('Subscribed successfully!');
        setEmail('');
      }
    } catch (error) {
      toast.error('Subscription failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Get Style Updates</h3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-2 rounded border focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Submitting...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
}