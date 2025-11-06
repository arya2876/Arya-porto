import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

/**
 * Custom hook to access theme context
 * @returns {Object} Theme context with theme and toggleTheme function
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export default useTheme;
