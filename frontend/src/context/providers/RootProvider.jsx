import { AuthProvider } from '../core/AuthContext';
import { UserProvider } from '../core/UserContext';
import { CartProvider } from '../core/CartContext';
import { OrderProvider } from '../core/OrderContext';
import { ThemeProvider } from '../ui/ThemeContext';
import { ModalProvider } from '../ui/ModalContext';
import { NotificationProvider } from '../ui/NotificationContext';
import { PaymentProvider } from '../features/PaymentContext';
import { MeasurementProvider } from '../features/MeasurementContext';
import { FabricProvider } from '../features/FabricContext';

export function RootProvider({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          <ModalProvider>
            <UserProvider>
              <CartProvider>
                <OrderProvider>
                  <MeasurementProvider>
                    <FabricProvider>
                      <PaymentProvider>
                        {children}
                      </PaymentProvider>
                    </FabricProvider>
                  </MeasurementProvider>
                </OrderProvider>
              </CartProvider>
            </UserProvider>
          </ModalProvider>
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}