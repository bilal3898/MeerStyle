// lib/providers/PaymentProvider.jsx
import { createContext, useContext, useState } from 'react';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [paymentData, setPaymentData] = useState({
    email: '',
    amount: 0,
    name: '',
    phone: '',
    items: [],
  });

  return (
    <PaymentContext.Provider value={{ paymentData, setPaymentData }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);
