// lib/providers/AnalyticsProvider.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const AnalyticsProvider = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', process.env.REACT_APP_GOOGLE_ANALYTICS_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location.pathname, location.search]);

  return children;
};
