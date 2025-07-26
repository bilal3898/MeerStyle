// frontend/src/services/auth.service.js

import axios from 'axios';
import { getToken, setToken, removeToken } from '@/lib/utils/token';
import { API_URL } from '@/lib/constants';

const BASE_URL = `${API_URL}/auth`;

const AuthService = {
  /**
   * Login user with email & password
   * @param {Object} credentials - { email, password }
   * @returns {Promise<Object>} user
   */
  async login(credentials) {
    try {
      const response = await axios.post(`${BASE_URL}/login`, credentials);
      const { token, user } = response.data;

      setToken(token);
      return user;
    } catch (error) {
      throw new Error(error?.response?.data?.message || 'Login failed');
    }
  },

  /**
   * Register a new user
   * @param {Object} data - { name, email, password, phone }
   * @returns {Promise<Object>} user
   */
  async register(data) {
    try {
      const response = await axios.post(`${BASE_URL}/register`, data);
      const { token, user } = response.data;

      setToken(token);
      return user;
    } catch (error) {
      throw new Error(error?.response?.data?.message || 'Registration failed');
    }
  },

  /**
   * Get the authenticated user's info
   * @returns {Promise<Object|null>} user
   */
  async getCurrentUser() {
    try {
      const token = getToken();
      if (!token) return null;

      const response = await axios.get(`${BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (err) {
      return null;
    }
  },

  /**
   * Logout the user
   */
  logout() {
    removeToken();
  },

  /**
   * Refresh access token (if supported)
   * @returns {Promise<string>} new token
   */
  async refreshToken() {
    try {
      const response = await axios.post(`${BASE_URL}/refresh-token`, null, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const { token } = response.data;
      setToken(token);
      return token;
    } catch (error) {
      throw new Error(error?.response?.data?.message || 'Token refresh failed');
    }
  },
};

export default AuthService;
