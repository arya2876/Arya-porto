import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import './SpinningLoader.css';

/**
 * Spinning Loader Component - Beautiful rotating dashes animation
 * From Uiverse.io by NlghtM4re
 */
const SpinningLoader = ({ fullScreen = true }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const loader = (
    <div className="spinning-loader-container">
      <div className="dash first"></div>
      <div className="dash seconde"></div>
      <div className="dash third"></div>
      <div className="dash fourth"></div>
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{
          background: isDark 
            ? 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)'
            : 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {loader}
        </motion.div>
      </motion.div>
    );
  }

  return <div className="relative w-full h-full">{loader}</div>;
};

export default SpinningLoader;
