// client/src/app/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomOrderLayout from './(main)/custom-order/layout';
import LoginPage from './auth/login/page';
import RegisterPage from './auth/register/page';
import NavBar from '../components/layout/Header/NavBar';
import Newsletter from '../components/layout/Footer/Newsletter';
import { ROUTES } from '@/lib/constants/routes';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path={ROUTES.CUSTOM_ORDER} element={<CustomOrderLayout />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      </Routes>
      <div className="p-6 border-t bg-white">
        <Newsletter />
      </div>
    </BrowserRouter>
  );
}

export default App;
