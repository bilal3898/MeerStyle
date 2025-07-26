// frontend/src/services/fabric.service.js
import axios from 'axios';
import { API_URL } from '@/lib/constants';

const BASE_URL = `${API_URL}/fabrics`;

const FabricService = {
  async getAllFabrics() {
    try {
      const response = await axios.get(`${BASE_URL}`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || 'Failed to fetch fabrics');
    }
  },

  async getFabricDetails(fabricId) {
    try {
      const response = await axios.get(`${BASE_URL}/${fabricId}`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || 'Failed to fetch fabric details');
    }
  },
};

export default FabricService;
