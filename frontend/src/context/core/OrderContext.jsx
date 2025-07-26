import PropTypes from 'prop-types';
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          const res = await fetch(`/api/users/${user.id}/orders`);
          const data = await res.json();
          setOrders(data);
        } catch (err) {
          setError('Failed to load orders');
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const createOrder = async (orderData) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify(orderData)
      });
      const newOrder = await res.json();
      setOrders(prev => [newOrder, ...prev]); // Optimistic update
      return newOrder;
    } catch (error) {
      throw new Error('Order creation failed');
    }
  };

  const value = {
    orders,
    loading,
    error,
    createOrder
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

OrderProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used within OrderProvider');
  return context;
};
