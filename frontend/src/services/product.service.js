// frontend/src/services/product.service.js
import axios from 'axios';
import { API_URL } from '@/lib/constants';

const BASE_URL = `${API_URL}/products`;

const ProductService = {
  async getAllProducts() {
    try {
      const response = await axios.get(`${BASE_URL}`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || 'Failed to fetch products');
    }
  },

  async getProductDetails(productId) {
    try {
      const response = await axios.get(`${BASE_URL}/${productId}`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || 'Failed to fetch product details');
    }
  },
};

export default ProductService;
