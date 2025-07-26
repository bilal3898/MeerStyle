// lib/payment/razorpay.js
import { useContext } from 'react';
import axios from 'axios';
import { PaymentContext } from '@/context/PaymentContext';

export async function createRazorpayOrder(amount, currency, email) {
  try {
    const { data } = await axios.post('/api/razorpay/create-order', {
      amount,
      currency,
      email,
    });

    return data;
  } catch (error) {
    console.error('Razorpay order error:', error);
    return null;
  }
}

export function launchRazorpay(orderDetails, userDetails, onSuccess) {
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
    amount: orderDetails.amount,
    currency: orderDetails.currency,
    name: 'Your Brand',
    description: 'Purchase Description',
    order_id: orderDetails.id,
    handler: onSuccess,
    prefill: {
      name: userDetails.name,
      email: userDetails.email,
      contact: userDetails.phone,
    },
    theme: {
      color: '#3399cc',
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
}
