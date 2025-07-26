// frontend/src/services/cart.service.js
import axios from 'axios';
import { API_URL } from '@/lib/constants';

const BASE_URL = `${API_URL}/cart`;

const CartService = {
  async getCart() {
    try {
      const response = await axios.get(`${BASE_URL}`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || 'Failed to fetch cart');
    }
  },

  async addToCart(productId, quantity) {
    try {
      const response = await axios.post(`${BASE_URL}/add`, { productId, quantity });
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || 'Failed to add item to cart');
    }
  },

  async removeFromCart(productId) {
    try {
      const response = await axios.post(`${BASE_URL}/remove`, { productId });
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || 'Failed to remove item from cart');
    }
  },
};

export default CartService;
