import PropTypes from 'prop-types';
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export function UserProvider({ children }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [preferences, setPreferences] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const res = await fetch(`/api/users/${user.id}`);
          const data = await res.json();
          setProfile(data);
          setPreferences(data.preferences || {});
        } catch (err) {
          setError('Failed to load profile');
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  const updateProfile = async (updates) => {
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      setProfile(prev => ({ ...prev, ...data }));
      return true;
    } catch (error) {
      throw new Error('Profile update failed');
    }
  };

  const value = {
    profile,
    preferences,
    loading,
    error,
    updateProfile
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
