// frontend/src/services/payment.service.js
import axios from 'axios';
import { API_URL } from '@/lib/constants';

const BASE_URL = `${API_URL}/payments`;

const PaymentService = {
  async createPayment(paymentData) {
    try {
      const response = await axios.post(`${BASE_URL}/create`, paymentData);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || 'Failed to create payment');
    }
  },

  async verifyPayment(paymentId) {
    try {
      const response = await axios.post(`${BASE_URL}/verify`, { paymentId });
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || 'Failed to verify payment');
    }
  },
};

export default PaymentService;
