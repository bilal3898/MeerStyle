// client/src/contexts/core/RootProvider.jsx
import React from 'react';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';
import { UserProvider } from './UserContext';
import { OrderProvider } from './OrderContext';
import { ThemeProvider } from '../ui/ThemeContext';
import { ModalProvider } from '../ui/ModalContext';
import { NotificationProvider } from '../ui/NotificationContext';

export const RootProvider = ({ children }) => (
  <AuthProvider>
    <CartProvider>
      <UserProvider>
        <OrderProvider>
          <ThemeProvider>
            <ModalProvider>
              <NotificationProvider>
                {children}
              </NotificationProvider>
            </ModalProvider>
          </ThemeProvider>
        </OrderProvider>
      </UserProvider>
    </CartProvider>
  </AuthProvider>
);
