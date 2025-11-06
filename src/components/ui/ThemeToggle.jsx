import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

/**
 * Theme Toggle Component with smooth animation
 */
const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative w-16 h-8 rounded-full p-1
        bg-light-border dark:bg-dark-border
        transition-colors duration-300
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        ${className}
      `}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Toggle Circle */}
      <motion.div
        className="w-6 h-6 rounded-full bg-white dark:bg-dark-card shadow-md flex items-center justify-center"
        layout
        initial={false}
        animate={{
          x: isDark ? 32 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            rotate: isDark ? 180 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <FaSun className="w-4 h-4 text-yellow-500" />
        </motion.div>
        
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : -180,
          }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <FaMoon className="w-4 h-4 text-blue-500" />
        </motion.div>
      </motion.div>

      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <FaSun className="w-3 h-3 text-yellow-500 opacity-50" />
        <FaMoon className="w-3 h-3 text-blue-400 opacity-50" />
      </div>
    </motion.button>
  );
};

export default ThemeToggle;
