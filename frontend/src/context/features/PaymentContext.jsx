import { createContext, useContext, useReducer, useEffect } from 'react';

const PaymentContext = createContext();

const paymentReducer = (state, action) => {
  switch(action.type) {
    case 'SET_METHODS':
      return { ...state, methods: action.payload, loading: false };
    case 'SELECT_METHOD':
      return { ...state, selectedMethod: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    default:
      return state;
  }
};

export function PaymentProvider({ children }) {
  const [state, dispatch] = useReducer(paymentReducer, {
    methods: [],
    transactions: [],
    selectedMethod: null,
    loading: false,
    error: null
  });

  const loadPaymentMethods = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const res = await fetch('/api/payment/methods');
      const data = await res.json();
      dispatch({ type: 'SET_METHODS', payload: data });
    } catch(error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load payment methods' });
    }
  };

  const processPayment = async (paymentData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const res = await fetch('/api/payment/process', {
        method: 'POST',
        body: JSON.stringify({
          ...paymentData,
          methodId: state.selectedMethod
        })
      });
      const transaction = await res.json();
      dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
      return transaction;
    } catch(error) {
      dispatch({ type: 'SET_ERROR', payload: 'Payment failed' });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  useEffect(() => {
    loadPaymentMethods();
  }, []);

  return (
    <PaymentContext.Provider value={{ ...state, processPayment, loadPaymentMethods }}>
      {children}
    </PaymentContext.Provider>
  );
}

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if(!context) throw new Error('usePayment must be used within PaymentProvider');
  return context;
};