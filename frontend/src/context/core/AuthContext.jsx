import PropTypes from 'prop-types';
import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUser({
        id: decoded.sub,
        email: decoded.email,
        role: decoded.role || 'user'
      });
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
      const { token } = await res.json();
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      setUser({
        id: decoded.sub,
        email: decoded.email,
        role: decoded.role
      });
      return true;
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
