// frontend/src/services/order.service.js
import axios from 'axios';
import { API_URL } from '@/lib/constants';

const BASE_URL = `${API_URL}/orders`;

const OrderService = {
  async createOrder(orderData) {
    try {
      const response = await axios.post(`${BASE_URL}/create`, orderData);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || 'Failed to create order');
    }
  },

  async getOrderDetails(orderId) {
    try {
      const response = await axios.get(`${BASE_URL}/${orderId}`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || 'Failed to fetch order details');
    }
  },
};

export default OrderService;
