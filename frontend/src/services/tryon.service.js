// frontend/src/services/tryon.service.js
import axios from 'axios';
import { API_URL } from '@/lib/constants';

const BASE_URL = `${API_URL}/tryon`;

const TryonService = {
  async getVirtualTryOn(data) {
    try {
      const response = await axios.post(`${BASE_URL}`, data);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || 'Failed to process virtual try-on');
    }
  },
};

export default TryonService;
