// client/src/app/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomOrderLayout from './(main)/custom-order/layout';
import CustomOrderPage from './(main)/custom-order/page';
import LoginPage from './auth/login/page';
import RegisterPage from './auth/register/page';
import Header from '../components/layout/Header/NavBar';
import Footer from '../components/layout/Footer/Newsletter';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/custom-order" element={<CustomOrderLayout />}>
          <Route index element={<CustomOrderPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Add more routes here */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
