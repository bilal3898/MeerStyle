import { useContext } from 'react';
import { PaymentContext } from '../features/PaymentContext';

/**
 * usePayment - Custom hook for managing payments
 * @returns {{
 *   paymentMethods: Array,
 *   selectedMethod: string,
 *   transactions: Array,
 *   processPayment: Function,
 *   loading: boolean,
 *   error: string|null
 * }}
 */
export const usePayment = () => {
  const context = useContext(PaymentContext);

  if (!context) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('usePayment called outside of PaymentProvider');
    }
    throw new Error('usePayment must be used within a PaymentProvider');
  }

  return {
    paymentMethods: context.methods,
    selectedMethod: context.selectedMethod,
    transactions: context.transactions,
    processPayment: context.processPayment,
    loading: context.loading,
    error: context.error
  };
};
