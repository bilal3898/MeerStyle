// frontend/src/services/user.service.js
import axios from 'axios';
import { API_URL } from '@/lib/constants';

const BASE_URL = `${API_URL}/users`;

const UserService = {
  async getUserProfile() {
    try {
      const response = await axios.get(`${BASE_URL}/profile`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || 'Failed to fetch user profile');
    }
  },

  async updateUserProfile(data) {
    try {
      const response = await axios.put(`${BASE_URL}/profile`, data);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || 'Failed to update user profile');
    }
  },
};

export default UserService;
