// frontend/src/services/measurement.service.js
import axios from 'axios';
import { API_URL } from '@/lib/constants';

const BASE_URL = `${API_URL}/measurements`;

const MeasurementService = {
  async getMeasurements() {
    try {
      const response = await axios.get(`${BASE_URL}`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || 'Failed to fetch measurements');
    }
  },

  async submitMeasurement(data) {
    try {
      const response = await axios.post(`${BASE_URL}/submit`, data);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || 'Failed to submit measurements');
    }
  },
};

export default MeasurementService;
