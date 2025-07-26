import { useContext } from 'react';
import { ThemeContext } from '../ui/ThemeContext';

/**
 * useTheme - Custom hook to manage theme context
 * @returns {{
 *   theme: string,
 *   toggleTheme: Function,
 *   isDarkMode: boolean
 * }}
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('useTheme called outside of ThemeProvider');
    }
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return {
    theme: context.theme,
    toggleTheme: context.toggleTheme,
    isDarkMode: context.theme === 'dark'
  };
};
