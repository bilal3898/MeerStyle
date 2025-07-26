// frontend/src/services/address.service.js
import axios from 'axios';
import { API_URL } from '@/lib/constants';

const BASE_URL = `${API_URL}/addresses`;

const AddressService = {
  async getAllAddresses() {
    try {
      const response = await axios.get(`${BASE_URL}`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || 'Failed to fetch addresses');
    }
  },

  async addNewAddress(addressData) {
    try {
      const response = await axios.post(`${BASE_URL}/add`, addressData);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || 'Failed to add new address');
    }
  },
};

export default AddressService;
