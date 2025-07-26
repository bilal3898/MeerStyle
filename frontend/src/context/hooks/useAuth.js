import { useContext } from 'react';
import { AuthContext } from '../core/AuthContext';

/**
 * useAuth - Custom hook to consume authentication context
 * @returns {{
 *   user: object|null,
 *   isAuthenticated: boolean,
 *   login: Function,
 *   logout: Function,
 *   loading: boolean
 * }}
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('useAuth called outside of AuthProvider');
    }
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return {
    user: context.user,
    isAuthenticated: !!context.user,
    login: context.login,
    logout: context.logout,
    loading: context.loading
  };
};
