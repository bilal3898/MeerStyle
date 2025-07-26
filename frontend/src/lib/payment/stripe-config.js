// lib/payment/stripe.js
import { loadStripe } from '@stripe/stripe-js';
import { createContext, useContext } from 'react';
import axios from 'axios';
import { PaymentContext } from '@/context/PaymentContext';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export async function createStripeCheckoutSession(items, email) {
  const stripe = await stripePromise;

  try {
    const { data } = await axios.post('/api/stripe/checkout-session', {
      items,
      email,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    });

    if (result.error) {
      console.error('Stripe redirect error:', result.error.message);
    }
  } catch (error) {
    console.error('Stripe session error:', error);
  }
}
