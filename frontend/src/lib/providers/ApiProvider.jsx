// lib/providers/ApiProvider.jsx
import React, { createContext, useContext } from 'react';
import axios from 'axios';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  return (
    <ApiContext.Provider value={{ api }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
